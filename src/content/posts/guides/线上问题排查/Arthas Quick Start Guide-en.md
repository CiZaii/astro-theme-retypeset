---
title: Arthas Quick Start Guide
published: 2025-08-05T00:00:00.000Z
updated: 2025-08-06T00:00:00.000Z
tags:
  - Performance Tuning
  - Diagnostic Tools
  - Java
lang: en
abbrlink: arthas-guide
aicommit: "This is Zang-AI. This article provides a detailed introduction to Arthas, a powerful Java diagnostic tool designed to solve common production issues such as high CPU usage, program deadlocks, slow application response, inconsistent online code, and debugging difficulties. The article covers Arthas core features including JDK 6+ support, command-line interaction, and cross-platform compatibility, and provides simple installation and startup methods through arthas-boot.jar. The article focuses on Arthas rich command categories and practical applications, using thread command to locate high CPU threads or detect deadlocks, using trace to analyze method performance bottlenecks, sc to view class loading information, and watch to monitor method parameters and return values, demonstrating its powerful capabilities in troubleshooting. Additionally, Arthas provides an intuitive Web Console. The article concludes by reminding users to be cautious when using Arthas in production environments, paying attention to its potential impact on application performance to ensure system safety and stable operation."
---

# 🛠️ Arthas Introduction

Arthas is a powerful Java diagnostic tool open-sourced by Alibaba in September 2018. It supports JDK 6 and above, provides interactive command-line mode, supports multiple platforms (Linux/Mac/Windows), and features Tab auto-completion. Arthas helps developers quickly diagnose and locate Java application production issues without modifying code or restarting services.

## 🤔 Why Do We Need Arthas?

In daily development, when encountering the following Java issues, traditional methods are inefficient:

- CPU load spikes, but unable to locate specific threads
- Thread deadlocks causing system freeze, difficult to view thread status in real-time
- Application response becomes slow, method call chain unclear
- Suspicion of online code inconsistency with local environment
- Unable to debug online issues, can only check logs

Arthas provides powerful solutions for these scenarios.

## 🚀 Quick Start

### Installation

Download and run with a single command:

```bash
# Download arthas-boot.jar
curl -O https://arthas.aliyun.com/arthas-boot.jar

# Launch Arthas
java -jar arthas-boot.jar
```

### Selecting Target Process

After startup, Arthas will automatically detect all Java processes on the current machine:

```
[INFO] arthas-boot version: 3.x.x
[INFO] Process:
* [1]: 35542 (Spring Boot Application)
  [2]: 71560 (Tomcat Application)
  [3]: 63914 (Other Java Process)
Please choose the target process (1-3, default is 1):
```

Simply enter the number to attach to the target process.

## 🎯 Core Commands

### 1. Thread Analysis Commands

#### `thread` - View Thread Information

**View all threads:**
```bash
[arthas@35542]$ thread
```

**Find high CPU consumption threads:**
```bash
[arthas@35542]$ thread -n 3
# Shows top 3 threads with highest CPU usage
```

**View specific thread:**
```bash
[arthas@35542]$ thread 1
# View thread with ID 1
```

**Detect deadlocks:**
```bash
[arthas@35542]$ thread -b
# Shows blocked threads and potential deadlocks
```

### 2. Class and Method Analysis

#### `sc` - View Class Information

**Search for classes:**
```bash
[arthas@35542]$ sc *UserService*
# Search for all classes containing 'UserService'
```

**View class details:**
```bash
[arthas@35542]$ sc -d com.example.UserService
# View detailed information about UserService class
```

#### `sm` - View Method Information

**View class methods:**
```bash
[arthas@35542]$ sm com.example.UserService
# List all methods in UserService class
```

**View method details:**
```bash
[arthas@35542]$ sm -d com.example.UserService getUserById
# View detailed information about getUserById method
```

### 3. Method Monitoring Commands

#### `watch` - Monitor Method Execution

**Monitor method parameters and return values:**
```bash
[arthas@35542]$ watch com.example.UserService getUserById '{params, returnObj}' -x 2
```

**Monitor method execution time:**
```bash
[arthas@35542]$ watch com.example.UserService getUserById '{params, returnObj, throwExp}' -x 2 -b -s -e
# -b: before method execution
# -s: after successful execution
# -e: after exception thrown
```

#### `trace` - Method Call Trace

**Trace method execution path:**
```bash
[arthas@35542]$ trace com.example.UserService getUserById
```

**Trace with time threshold:**
```bash
[arthas@35542]$ trace com.example.UserService getUserById '#cost > 100'
# Only show calls that take more than 100ms
```

#### `monitor` - Method Execution Statistics

**Monitor method execution statistics:**
```bash
[arthas@35542]$ monitor -c 5 com.example.UserService getUserById
# Monitor for 5 seconds and show statistics
```

### 4. JVM Analysis Commands

#### `dashboard` - System Overview

```bash
[arthas@35542]$ dashboard
# Real-time display of system metrics: CPU, memory, GC, threads, etc.
```

#### `jvm` - JVM Information

```bash
[arthas@35542]$ jvm
# View JVM version, parameters, memory allocation, etc.
```

#### `memory` - Memory Information

```bash
[arthas@35542]$ memory
# View heap/non-heap memory usage details
```

#### `gc` - GC Information

```bash
[arthas@35542]$ gc
# View garbage collection statistics
```

### 5. Class Loading Commands

#### `classloader` - View ClassLoader Information

```bash
[arthas@35542]$ classloader
# View all ClassLoader information
```

**Find classes loaded by specific ClassLoader:**
```bash
[arthas@35542]$ classloader -c 327a647b
# View classes loaded by specified ClassLoader
```

#### `mc` and `redefine` - Hot Code Replacement

**Compile Java source:**
```bash
[arthas@35542]$ mc /tmp/UserService.java -d /tmp
# Compile UserService.java to /tmp directory
```

**Hot replace class:**
```bash
[arthas@35542]$ redefine /tmp/com/example/UserService.class
# Hot replace UserService class
```

## 🌐 Web Console

Arthas also provides a Web interface for easier use:

```bash
# Start with Web Console
java -jar arthas-boot.jar --target-ip 0.0.0.0
```

Then access `http://localhost:8563` in your browser.

## 📊 Practical Troubleshooting Examples

### Example 1: Troubleshooting High CPU Issues

```bash
# Step 1: View high CPU threads
[arthas@35542]$ thread -n 5

# Step 2: View specific thread details
[arthas@35542]$ thread 42

# Step 3: Trace suspected methods
[arthas@35542]$ trace com.example.service.ProcessService process
```

### Example 2: Method Performance Analysis

```bash
# Monitor method execution time
[arthas@35542]$ watch com.example.UserService getUserById '{params[0], returnObj, cost}' -x 2

# Trace method call chain
[arthas@35542]$ trace com.example.UserService getUserById '#cost > 50'
```

### Example 3: Deadlock Detection

```bash
# Detect deadlocks
[arthas@35542]$ thread -b

# View blocked thread details
[arthas@35542]$ thread 28
```

### Example 4: Memory Leak Investigation

```bash
# Monitor GC situation
[arthas@35542]$ gc

# View heap memory details
[arthas@35542]$ memory

# Monitor object creation
[arthas@35542]$ watch java.util.ArrayList <init> '{params, target}' -x 2
```

## ⚠️ Production Environment Considerations

### Performance Impact

1. **Minimal Impact**: Arthas has very low performance overhead under normal use
2. **Heavy Commands**: Commands like `watch`, `trace` may have some impact
3. **Recommended**: Test in staging environment first

### Security Considerations

```bash
# Set access restrictions
java -jar arthas-boot.jar --target-ip 127.0.0.1 --http-port 8563 --telnet-port 3658
```

### Resource Management

```bash
# Exit Arthas
[arthas@35542]$ quit

# Stop Arthas completely
[arthas@35542]$ stop
```

## 🎁 Advanced Features

### Profiler Integration

```bash
# Start profiler
[arthas@35542]$ profiler start

# Generate flame graph
[arthas@35542]$ profiler getSamples
[arthas@35542]$ profiler status
```

### Log Monitoring

```bash
# Monitor log output
[arthas@35542]$ logger

# Change log level
[arthas@35542]$ logger --name com.example --level DEBUG
```

### OGNL Expression Support

```bash
# Use OGNL expressions in watch command
[arthas@35542]$ watch com.example.UserService getUserById '@user.name'

# Get static field value
[arthas@35542]$ ognl '@com.example.Constants@DEFAULT_SIZE'
```

## 📝 Best Practices

### 1. Effective Use of Filtering

```bash
# Filter by execution time
[arthas@35542]$ trace com.example.UserService * '#cost > 100'

# Filter by parameter values
[arthas@35542]$ watch com.example.UserService getUserById 'params[0] > 1000'
```

### 2. Batch Operations

```bash
# Monitor multiple methods
[arthas@35542]$ monitor -c 10 com.example.UserService *
```

### 3. Result Export

```bash
# Export results to file
[arthas@35542]$ trace com.example.UserService getUserById > /tmp/trace.log
```

## 🔚 Summary

Arthas is a powerful Java diagnostic tool that can help developers:

- **Quickly locate** high CPU and performance issues
- **Real-time monitor** method execution without code changes
- **Analyze** class loading and memory issues
- **Hot replace** code for rapid debugging

**Key Points**:
- ✅ Zero intrusion, no need to restart applications
- ✅ Rich command set covering various diagnostic scenarios
- ✅ Simple to use with Tab completion support
- ⚠️ Use cautiously in production, pay attention to performance impact

Arthas is an essential tool for Java developers, especially valuable for production environment troubleshooting and performance optimization.
