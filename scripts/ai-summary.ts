/**
 * AI自动摘要生成工具
 * 基于配置自动为博客文章生成AI摘要
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import process from 'node:process'
import * as yaml from 'js-yaml'

interface Config {
  aisummary: {
    enable: boolean
    cover_all: boolean
    summary_field: string
    logger: number
    api: string
    token: string
    model: string
    prompt: string
    ignoreRules: string[]
    max_token: number
    concurrency: number
  }
}

interface PostMatter {
  [key: string]: any
}

class AISummaryGenerator {
  private config: Config['aisummary']
  private postsDir = 'src/content/posts'
  private processingQueue: string[] = []
  private processedCount = 0
  private skipCount = 0
  private errorCount = 0

  constructor(configPath: string = 'aisummary.config.yaml') {
    try {
      const configContent = readFileSync(configPath, 'utf8')
      const fullConfig = yaml.load(configContent) as Config
      this.config = fullConfig.aisummary

      if (!this.config.enable) {
        console.log('❌ AI摘要功能已禁用')
        process.exit(0)
      }

      this.log('✅ AI摘要配置加载成功', 2)
    }
    catch (error) {
      console.error('❌ 配置文件读取失败:', error)
      process.exit(1)
    }
  }

  private log(message: string, level: number = 1) {
    if (this.config.logger >= level) {
      console.log(message)
    }
  }

  private logError(message: string) {
    if (this.config.logger >= 0) {
      console.error(message)
    }
  }

  // 递归扫描文章目录
  private scanPostsDirectory(dir: string = this.postsDir): string[] {
    const files: string[] = []

    try {
      const items = readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          files.push(...this.scanPostsDirectory(fullPath))
        }
        else if (['.md', '.mdx'].includes(extname(item))) {
          files.push(fullPath)
        }
      }
    }
    catch {
      this.logError(`❌ 扫描目录失败: ${dir}`)
    }

    return files
  }

  // 解析文章frontmatter和内容
  private parsePost(filePath: string): { frontmatter: PostMatter, content: string } | null {
    try {
      const fileContent = readFileSync(filePath, 'utf8')

      // 匹配frontmatter
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (!frontmatterMatch) {
        this.logError(`❌ 无法解析frontmatter: ${filePath}`)
        return null
      }

      const [, frontmatterStr, content] = frontmatterMatch
      const frontmatter = yaml.load(frontmatterStr) as PostMatter

      return { frontmatter, content: content.trim() }
    }
    catch (error) {
      this.logError(`❌ 解析文件失败: ${filePath} - ${error}`)
      return null
    }
  }

  // 清洗文章内容
  private cleanContent(content: string): string {
    let cleaned = content

    // 应用自定义清洗规则
    for (const rule of this.config.ignoreRules) {
      const regex = new RegExp(rule, 'g')
      cleaned = cleaned.replace(regex, '')
    }

    // 基本清洗
    cleaned = cleaned
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/`[^`]+`/g, '') // 移除行内代码
      .replace(/#{1,6}\s+/g, '') // 移除markdown标题符号
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
      .replace(/\*(.*?)\*/g, '$1') // 移除斜体
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接，保留文字
      .replace(/\n+/g, ' ') // 替换换行为空格
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim()

    return cleaned
  }

  // 估算token数量（简单估算）
  private estimateTokens(text: string): number {
    // 中文字符按1个token计算，英文单词按平均4字符1个token计算
    const chineseChars = (text.match(/[\u4E00-\u9FFF]/g) || []).length
    const englishText = text.replace(/[\u4E00-\u9FFF]/g, '')
    const englishTokens = Math.ceil(englishText.length / 4)

    return chineseChars + englishTokens
  }

  // 调用AI API生成摘要
  private async generateSummary(content: string): Promise<string> {
    try {
      const cleanedContent = this.cleanContent(content)
      const tokenCount = this.estimateTokens(cleanedContent)

      if (tokenCount > this.config.max_token) {
        // 截取内容
        const ratio = this.config.max_token / tokenCount
        const cutLength = Math.floor(cleanedContent.length * ratio * 0.9)
        const truncatedContent = cleanedContent.slice(0, cutLength)
        this.log(`⚠️  内容过长，已截取到${cutLength}字符`, 2)
        return this.callAIAPI(truncatedContent)
      }

      return this.callAIAPI(cleanedContent)
    }
    catch (error) {
      throw new Error(`生成摘要失败: ${error}`)
    }
  }

  // 调用AI API
  private async callAIAPI(content: string): Promise<string> {
    const requestBody = {
      model: this.config.model,
      messages: [
        {
          role: 'user',
          content: `${this.config.prompt}\n\n文章内容：\n${content}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }

    const response = await fetch(this.config.api, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API请求失败: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('AI API返回格式错误')
    }

    return data.choices[0].message.content.trim()
  }

  // 更新文章文件
  private updatePostFile(filePath: string, frontmatter: PostMatter, content: string, summary: string) {
    try {
      frontmatter[this.config.summary_field] = summary

      // 重构frontmatter YAML
      const yamlStr = yaml.dump(frontmatter, {
        defaultStyle: '|',
        lineWidth: -1,
        noRefs: true,
      })

      const newContent = `---\n${yamlStr}---\n\n${content}`
      writeFileSync(filePath, newContent, 'utf8')

      this.log(`✅ 已更新: ${filePath}`, 2)
    }
    catch (error) {
      throw new Error(`更新文件失败: ${error}`)
    }
  }

  // 处理单个文章
  private async processPost(filePath: string): Promise<void> {
    try {
      const parsed = this.parsePost(filePath)
      if (!parsed)
        return

      const { frontmatter, content } = parsed
      const summaryField = this.config.summary_field

      // 检查是否需要生成摘要
      if (frontmatter[summaryField] && !this.config.cover_all) {
        this.log(`⏭️  跳过(已有摘要): ${filePath}`, 2)
        this.skipCount++
        return
      }

      // 检查是否单独禁用
      if (frontmatter.is_summary === false) {
        this.log(`⏭️  跳过(单独禁用): ${filePath}`, 2)
        this.skipCount++
        return
      }

      this.log(`🔄 正在处理: ${filePath}`)

      // 生成AI摘要
      const summary = await this.generateSummary(content)

      // 更新文件
      this.updatePostFile(filePath, frontmatter, content, summary)

      this.processedCount++
      this.log(`✅ 生成完成: ${filePath}`)
    }
    catch (error) {
      this.logError(`❌ 处理失败: ${filePath} - ${error}`)
      this.errorCount++
    }
  }

  // 并发处理队列
  private async processQueue() {
    const chunks: string[][] = []
    for (let i = 0; i < this.processingQueue.length; i += this.config.concurrency) {
      chunks.push(this.processingQueue.slice(i, i + this.config.concurrency))
    }

    for (const chunk of chunks) {
      await Promise.allSettled(
        chunk.map(filePath => this.processPost(filePath)),
      )

      // 短暂延迟，避免API限制
      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  // 主执行函数
  async run() {
    console.log('🚀 开始AI摘要生成...')

    // 扫描所有文章文件
    this.processingQueue = this.scanPostsDirectory()

    if (this.processingQueue.length === 0) {
      console.log('❌ 未找到任何文章文件')
      return
    }

    console.log(`📊 发现 ${this.processingQueue.length} 个文章文件`)

    const startTime = Date.now()

    // 处理文章
    await this.processQueue()

    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    // 输出统计信息
    console.log('\n📈 处理完成!')
    console.log(`✅ 成功生成: ${this.processedCount}`)
    console.log(`⏭️  跳过文件: ${this.skipCount}`)
    console.log(`❌ 失败文件: ${this.errorCount}`)
    console.log(`⏱️  耗时: ${duration}秒`)

    if (this.errorCount > 0) {
      process.exit(1)
    }
  }
}

// 主程序
async function main() {
  const generator = new AISummaryGenerator()
  await generator.run()
}

// 检查是否为直接执行
const isMainModule = process.argv[1]?.includes('ai-summary.ts') || process.argv[1]?.includes('ai-summary.js')
if (isMainModule) {
  main().catch((error) => {
    console.error('❌ 程序执行失败:', error)
    process.exit(1)
  })
}

export default AISummaryGenerator
