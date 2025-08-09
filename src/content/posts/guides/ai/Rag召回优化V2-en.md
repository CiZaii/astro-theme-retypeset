---
title: RAG Retrieval Optimization - V2
published: 2025-08-05T00:00:00.000Z
updated: 2025-08-06T00:00:00.000Z
tags:
  - RAG
  - Retrieval
lang: en
abbrlink: rag-retrieval-en
password: "ragRetrieval"
aicommit: '这里是Zang-AI，这篇文章探讨了四种优化信息检索召回结果的后置处理方案，旨在解决标题和大纲对检索结果的过度影响以及短段落内容不完整的问题。方案一通过计算并应用干扰率来动态调整高干扰段落的分数。方案二在检索后动态对文档进行二次分段和语义合并，以形成更完整的段落再排序。方案三采用父子分段的层次化索引，将短段落合并为父文档进行初步检索，实现了多粒度查询。方案四则是一种更彻底的数据重入库方法，在入库前就通过智能分段与合并优化索引质量。文章最后还对比了四种方案的优劣，并给出了实践建议。'
---

# Approach 1 (Post-Retrieval Processing): Interference Rate Processing

## 1. Core Concept
Maintain the original segmentation approach while calculating the "interference rate" for each paragraph (the degree to which titles/outlines impact retrieval results). Apply special processing to high-interference paragraphs to reduce inappropriate influence of titles and outlines on retrieval results.

## 2. Implementation Process
1. Material Library: Store complete paragraphs (title + outline + content).
2. Regular Retrieval: Perform initial retrieval using user queries in the material library.
3. Dynamic Interference Rate Calculation: Calculate interference rates for retrieval results.
4. Score Adjustment: Apply score decay for high-interference paragraphs.
5. Re-ranking: Re-sort by adjusted scores.

### 2.1 Pseudocode
```pseudo
// 1. Maintain single material library index
materialLibrary = createVectorIndex(allParagraphs)  // Complete format: "title\noutline\ncontent"

// 2. Retrieval implementation
function query(userInput):
    initialResults = materialLibrary.retrieve(userInput, top_k=10)  // Retrieve more for re-ranking

    // Calculate interference rates
    for result in initialResults:
        title, outline, content = separateComponents(result.text)
        interferenceRate = calculateInterferenceRate(title + outline, content, userInput)
        result.interferenceRate = interferenceRate

    interferenceThreshold = 1.3
    for result in initialResults:
        if result.interferenceRate > interferenceThreshold:
            result.adjustedScore = result.originalScore / result.interferenceRate
        else:
            result.adjustedScore = result.originalScore

    sortedResults = sortBy(adjustedScore)(initialResults)
    return sortedResults.top(5)
```

### 2.2 Interference Rate Calculation Example
Example paragraph (Segment 3):
```
***
```
Split:
- Title+Outline: Lines 1–3
- Content: Lines 4–10

Calculation (example assumed values):
- Similarity between Title+Outline and (Title+Outline+Content): 0.72
- Similarity between Title+Outline and Content: 0.50
- Interference Rate = 0.72 / 0.50 = 1.44 > 1.3 (High interference)

### 3. Specific Case Study
User Query: `"Enterprise Management System Standards\n2. Position Requirements"`

#### 3.1 Initial Retrieval Results (Example)
| Result | Original Score | Description |
| ------ | -------------- | ----------- |
| Segment 4 | 0.88 | Directly related to "position requirements" |
| Segment 3 | 0.84 | Related to position conditions |
| Segment 2 | 0.76 | General provisions |

#### 3.2 Interference Rate Calculation (Example)
- Segment 4: Interference rate 0.96 (Low)
- Segment 3: Interference rate 1.26 (Near threshold)
- Segment 2: Interference rate 2.14 (High)

#### 3.3 Score Adjustment
- Segment 4: 0.88 → 0.88
- Segment 3: 0.84 → 0.84
- Segment 2: 0.76 → 0.36 (0.76 / 2.14)

#### 3.4 Ranking
1. Segment 4 (0.88)
2. Segment 3 (0.84)
3. Segment 2 (0.36)

### 4. API Testing
Endpoint: `POST http://example.com:8080/ai/chat/autoReference`

Request Body:
```json
{
  "searchWord": "Artificial Intelligence Technology\n2. Development History of AI",
  "interference": 1.01
}
```

Response (Excerpt):
```json
{
  "success": true,
  "data": [
    {
      "title+outline+content": [ { "score": 0.8789253, "id": "2149793922940857", "content": "..." } ],
      "content": [ { "score": 0.866995, "id": "21497939229408532", "content": "..." } ],
      "interferenceCalculation": [ { "interferenceRatio": 1.0090, "fullContentScore": 0.87149847 } ],
      "finalTop5": [ { "score": 0.86370814, "id": "21497939229408515" } ]
    }
  ]
}
```

---

# Approach 2 (Post-Retrieval Processing): Material Retrieval Reorganization

## 1. Core Concept
Maintain the original data storage structure while dynamically processing paragraphs during retrieval to solve short paragraph issues and improve semantic completeness.

## 2. Implementation Process
1. Initial Retrieval & Document Localization: Vector recall or title tokenization to locate candidate documents.
2. Document Segmentation & Layout Analysis: Use intelligent segmentation tools + layout analysis engines to extract structure.
3. Semantic Paragraph Merging: Merge short segments based on structural hierarchy and semantic similarity.
4. Re-vectorization & Precision Ranking: Vectorize reorganized segments + reranker sorting.

### 2.1 Description
- Quickly locate documents through retrieval.
- Extract original text and perform secondary segmentation and structural analysis.
- Merge adjacent short paragraphs while preserving semantic completeness of chapters.

### 3. Example
User Query: `Enterprise management system standards position requirements detailed description`

Identify original text sections (illustrative) and merge:
- Merged Segment A = Segment 1 + Segment 2
- Merged Segment B = Segment 3 + Segment 4
- Merged Segment C = Segment 11 + Segment 12 + Segment 13
- Segments 6/7/8 decide whether to merge based on length and semantics (example keeps 7, 8 independent)

Final retrieval ranking:
1. Segment 8 (Position Requirements)
2. Segment 7 (Position Conditions)
3. Merged Segment B (General Provisions)
4. Merged Segment C (Term Regulations)
5. Merged Segment A (Introduction)

---

# Approach 3 (Data Re-indexing): Parent-Child Segment Hierarchical Indexing

## 1. Core Concept
Utilize parent-child segment structure to build hierarchical indexing: parent segments (merged short segments) serve as high-level entry points, while child segments retain fine-grained information.

## 2. Implementation Process
1. Retain original fine-grained child segments (title+outline+content).
2. Scan adjacent short paragraphs (< threshold) and merge by topic to generate parent segments (remove non-first segment titles/outlines).
3. Build dual-layer vector indexing: child segment index + parent segment retrieval index.
4. Query parent segments first during search, then drill down to child segments as needed.

### 2.1 Pseudocode (Excerpt)
```pseudo
getAllChildSegments
parentSegmentSet = []
mergedIDs = set()
threshold = 200
for i in range(len(childSegments)):
  p = childSegments[i]
  if p.wordCount < threshold:
    group = [p]
    j = i + 1
    while j < len(childSegments) and topicRelated(p, childSegments[j]) and childSegments[j].wordCount < threshold:
      group.append(childSegments[j]); j += 1
    if len(group) > 1:
      parentText = merge(group)  // Only first segment retains title+outline
      parentSegmentSet.add(parentText)
      markAsMerged
      i = j - 1

retrievalIndexUse: parentSegments + unmergedChildSegments
```

### 3. Text Merging Strategy
Parent Segment = Child Segment 1 (title+outline+content) + "\n" + Child Segment 2 (content) + ...

### 4. Case Study (Excerpt)
Threshold 200 words: Segment 7 and Segment 8 merge → Parent Segment A.

Structure:
- Retain: 1,2,3,4,5,6,9
- Merge: 7+8 → Parent Segment A

Vector Index:
```pseudo
retrievalVectorSet = { Segment1..6, ParentSegmentA, Segment9 }
parentChildMapping = { ParentSegmentA: [Segment7, Segment8] }
```

Retrieval Example: `"Enterprise Management System Standards\n1. Term Regulations"`
- Parent Segment A: 0.87
- Segment 9: 0.42
- Segment 3: 0.31

Child segment difference strategy:
- If Child Segment 7=0.88 and 8=0.80 have small difference → Return Parent Segment A
- If 7=0.88 and 8=0.60 have large difference → Return only Child Segment 7

---

# Approach 4 (Data Re-indexing): Switch Segmentation Merging Logic

## 1. Core Concept
Preprocessing optimization: Complete segmentation, layout analysis, and semantic merging before indexing to improve index foundation quality.

## 2. Implementation Steps
1. Document Intelligent Segmentation: Use segmentation tools to obtain fine-grained paragraphs.
2. Layout Analysis: Use layout engines to identify titles, hierarchies, fonts, and other structural features.
3. Intelligent Paragraph Merging: Merge short segments based on layout + semantic similarity to form semantically complete units.
4. Re-vectorization and Indexing: Replace old index, establish new structure.

---

# Four-Approach Comparison (Summary)
| Approach | Modification Scope | Implementation Timeline | Advantages | Risks/Costs |
| -------- | ------------------ | ---------------------- | ---------- | ----------- |
| Approach 1 | Post-retrieval re-ranking | Short | Quick deployment, low intrusion | Threshold tuning depends on experiments |
| Approach 2 | Dynamic retrieval process reorganization | Medium | Balance completeness and real-time performance | Additional runtime computation |
| Approach 3 | Add hierarchical indexing | Medium-long | Multi-granularity retrieval flexibility | Complexity of maintaining dual indexes |
| Approach 4 | Data re-indexing | Long | Highest foundation quality | Large transformation scope, high deployment cost |

---

# Parameters and Practical Recommendations
- Initial interference rate threshold recommendation: 1.1 ~ 1.3 (use A/B search click verification with bucketing).
- Short paragraph threshold: 150~220 characters need optimization combined with document average length distribution (P95 reference).
- Merging strategy priority: Structural hierarchy > Semantic similarity > Length supplementation.
- Reranker usage: Prioritize application on reorganized/parent segment collections (reduce call frequency).
- Monitoring metrics: Recall click-through rate, first-screen relevance manual annotation scores, average paragraph word count, duplicate content rate.

---

# Future Iteration Directions
1. Incorporate interference rate features into learning-to-rank models (fusing BM25 / Vector / Meta Features).
2. Introduce cross-segment concatenation for Query Expansion (reduce title speculative matching).
3. Local sparsification within parent-child indexes (reduce storage + improve retrieval speed).
4. Dynamic thresholds: Adaptively adjust interference rate thresholds based on Query types (navigation / information / task).

> Note: All example scores in this document are hypothetical values used solely to illustrate computational processes.
