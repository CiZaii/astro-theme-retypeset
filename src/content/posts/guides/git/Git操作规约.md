---
title: Git操作规约
published: 2025-08-04T00:00:00.000Z
updated: 2025-08-04T00:00:00.000Z
tags:
  - 开发规约
pin: 1
lang: zh
abbrlink: git-commit-message-guidelines
aicommit: 这里是Zang-AI，这篇文章介绍了Git操作规约，主要涵盖了Git Flow模型、提交日志规约和分支命名规约。Git Flow模型定义了Master、Develop、Feature、Release和Hotfix等分支及其用途，旨在提升团队协作和版本稳定性。提交日志规约规定了“类型范围主题”的格式，明确了不同类型如新功能修复等含义，并对范围和主题的编写提出了要求。分支命名规约则采用“类型时间描述开发者”的格式，详细说明了各部分的规范，以实现清晰化管理。
knowledge_graph:
  nodes:
    - id: git-op-spec
      label: Git操作规约
      type: 概念
      description: 一套关于Git使用的综合性规范，旨在提升协作效率和代码管理质量。
      importance: 1
      category: primary
    - id: git-flow
      label: Git Flow
      type: 技术模型
      description: 一种流行的Git工作流程模型，通过严格的分支管理策略来组织软件开发和发布。
      importance: 0.9
      category: primary
    - id: commit-spec
      label: 提交日志规约
      type: 规范
      description: 定义了Commit Message的标准格式，包括type、scope和subject，以增强日志的可读性。
      importance: 0.8
      category: primary
    - id: branch-spec
      label: 分支命名规约
      type: 规范
      description: 定义了分支的标准化命名格式，通常包括类型、时间、描述和开发者。
      importance: 0.8
      category: primary
    - id: vincent-d
      label: Vincent Driessen
      type: 人物
      description: Git Flow模型的提出者。
      importance: 0.4
      category: secondary
    - id: dev-team
      label: 软件开发团队
      type: 组织
      description: Git Flow模型的主要使用者，通过该模型进行协作开发。
      importance: 0.5
      category: secondary
    - id: master-branch
      label: Master 分支
      type: 技术
      description: 代表主要的稳定版本，用于发布生产环境的代码。
      importance: 0.8
      category: secondary
    - id: develop-branch
      label: Develop 分支
      type: 技术
      description: 主开发分支，包含最新的开发代码，是所有新功能的集成点。
      importance: 0.8
      category: secondary
    - id: feature-branch
      label: Feature 分支
      type: 技术
      description: 用于单个新功能的开发，从Develop分支创建并最终合并回Develop分支。
      importance: 0.7
      category: secondary
    - id: release-branch
      label: Release 分支
      type: 技术
      description: 用于版本发布准备，进行最终测试和Bug修复。
      importance: 0.7
      category: secondary
    - id: hotfix-branch
      label: Hotfix 分支
      type: 技术
      description: 用于紧急修复生产环境中的BUG，从Master分支创建。
      importance: 0.7
      category: secondary
    - id: commit-message
      label: Commit Message
      type: 概念
      description: 提交日志的主体内容，其格式由提交日志规约定义。
      importance: 0.6
      category: secondary
    - id: commit-type
      label: commit type
      type: 概念
      description: Commit Message的一部分，用于说明提交的类型，如feature, fix等。
      importance: 0.5
      category: secondary
    - id: commit-scope
      label: commit scope
      type: 概念
      description: Commit Message的一部分，用于说明commit影响的范围。
      importance: 0.4
      category: secondary
    - id: commit-subject
      label: commit subject
      type: 概念
      description: Commit Message的一部分，用于简短描述提交目的。
      importance: 0.5
      category: secondary
  edges:
    - id: edge-1
      source: git-op-spec
      target: git-flow
      type: 包含
      label: 包含
      weight: 0.9
    - id: edge-2
      source: git-op-spec
      target: commit-spec
      type: 包含
      label: 包含
      weight: 0.9
    - id: edge-3
      source: git-op-spec
      target: branch-spec
      type: 包含
      label: 包含
      weight: 0.9
    - id: edge-4
      source: git-flow
      target: vincent-d
      type: 提出者
      label: 由...提出
      weight: 0.6
    - id: edge-5
      source: git-flow
      target: dev-team
      type: 使用者
      label: 被...广泛使用
      weight: 0.7
    - id: edge-6
      source: git-flow
      target: master-branch
      type: 定义
      label: 定义分支
      weight: 0.9
    - id: edge-7
      source: git-flow
      target: develop-branch
      type: 定义
      label: 定义分支
      weight: 0.9
    - id: edge-8
      source: git-flow
      target: feature-branch
      type: 定义
      label: 定义分支
      weight: 0.8
    - id: edge-9
      source: git-flow
      target: release-branch
      type: 定义
      label: 定义分支
      weight: 0.8
    - id: edge-10
      source: git-flow
      target: hotfix-branch
      type: 定义
      label: 定义分支
      weight: 0.8
    - id: edge-11
      source: feature-branch
      target: develop-branch
      type: 创建于
      label: 创建于
      weight: 0.8
    - id: edge-12
      source: feature-branch
      target: develop-branch
      type: 合并至
      label: 合并至
      weight: 0.8
    - id: edge-13
      source: release-branch
      target: develop-branch
      type: 创建于
      label: 创建于
      weight: 0.8
    - id: edge-14
      source: release-branch
      target: master-branch
      type: 合并至
      label: 合并至
      weight: 0.8
    - id: edge-15
      source: release-branch
      target: develop-branch
      type: 合并至
      label: 合并至
      weight: 0.8
    - id: edge-16
      source: hotfix-branch
      target: master-branch
      type: 创建于
      label: 创建于
      weight: 0.8
    - id: edge-17
      source: hotfix-branch
      target: master-branch
      type: 合并至
      label: 合并至
      weight: 0.8
    - id: edge-18
      source: hotfix-branch
      target: develop-branch
      type: 合并至
      label: 合并至
      weight: 0.8
    - id: edge-19
      source: commit-spec
      target: commit-message
      type: 定义
      label: 定义格式
      weight: 1
    - id: edge-20
      source: commit-message
      target: commit-type
      type: 组成部分
      label: 包含
      weight: 0.9
    - id: edge-21
      source: commit-message
      target: commit-scope
      type: 组成部分
      label: 包含
      weight: 0.9
    - id: edge-22
      source: commit-message
      target: commit-subject
      type: 组成部分
      label: 包含
      weight: 0.9
  metadata:
    extracted_at: '2025-08-07T02:20:06.135Z'
    entity_count: 15
    relation_count: 22
    confidence: 0.8
---

## Git操作规约

### Git Flow 模型

Git Flow是一种流行的Git工作流程模型，旨在更好地管理Git仓库中的分支和版本控制。它是由 Vincent Driessen 在一篇博文中提出的，并且得到了广泛的采用。
Git Flow 定义了一组严格的分支命名约定和分支的用途，以便团队成员可以更好地协作开发和管理软件项目。该工作流程包括以下几个主要分支：

> 1. Master 分支：代表了主要的稳定版本，用于发布生产环境的代码。通常是经过测试和审核的最新可发布代码。
> 2. Develop 分支：是开发分支，包含最新的开发代码。所有的功能开发、bug修复等都在此分支上进行。
> 3. Feature 分支：用于单个功能的开发，通常从 Develop 分支创建，并在开发完成后合并回 Develop 分支。
> 4. Release 分支：用于发布准备，当在 Develop 分支上积累了足够的功能后，会从 Develop 分支创建<br> Release 分支，用于进行最终的测试和修复 BUG，然后合并回 Master 和 Develop 分支。
> 5. Hotfix 分支：用于紧急修复生产环境中的 BUG。从 Master 分支创建，修复后会合并回 Master 和 Develop 分支。

> Git Flow 通过这样的分支管理方式，使得团队能够更好地协作，同时确保在开发和发布过程中的稳定性和可靠性。这种工作流程在许多软件开发团队中被广泛使用，并被认为是一种成熟、可靠的Git工作流模型。

### 提交日志规约

Cimmit Message：type(scope[optional]): subject

#### 1、type

- feature：新功能
- fix：修补bug
- docs：文档
- style：格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- optimize：优化

#### 2、scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### 3、subject

subject是 commit 目的的简短描述，不超过50个字符。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

示例：
feature(message-center): 开发消息发送落库功能。或者 feature: 开发消息发送落库功能。

### 分支命名规约

分支命名：{type}_{time}_{describe}_{developer}

#### 1、type

- feature：新功能
- fix：修补bug
- docs：文档
- style：格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- optimize：优化

#### 2、time

- 格式：20190301

#### 3、describe

例如消息发送：send-message。尽量以两个单词描述清楚，多个单词间使用中划线 - 分割。

#### 4、developer

建议填写开发者名字，例如：eliauk.doo

示例：
feature_20220915_send-message_eliauk.doo