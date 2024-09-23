# `< log` - A Flexible and Powerful Logger for TypeScript

`< log` is a versatile logging library for TypeScript designed to support both **JSON** and **plain-text** logging formats. It provides colorized output in plain-text mode and supports structured logs in JSON format with contextual data.

## Features

- Supports two modes: **JSON** and **plain-text**
- Colorized logs for different log levels in plain-text mode
- Structured logging with context fields in JSON mode
- Configurable log levels: `debug`, `info`, `warn`, `error`, `fatal`
- Easy to integrate and lightweight

## Installation

You can install the library using npm or Yarn:

```bash
npm install lt_log
```

or 


```bash
yarn add lt_log
```

## Usage

### 1. Basic Setup:
Here is a basic example of how to use < log:

```typescript
import Logger, { LogLevel, LogMode } from '<log>';

// Create a logger with JSON output
const jsonLogger = new Logger(LogLevel.Info, LogMode.Json);
jsonLogger.info('User login successful', { userId: 123 });

// Create a logger with colored plain-text output
const plainLogger = new Logger(LogLevel.Info, LogMode.Plain);
plainLogger.info('User logged out', { userId: 456 });

```

### 2. Log Levels:
< log supports five log levels, which can be used to filter logs based on severity:

- `debug`: Detailed information typically useful only during development.
- `info`: General information about app behavior.
- `warn`: An indication that something unexpected happened, but the app is still functioning.
- `error`: A problem that requires attention.
- `fatal`: A critical problem that will cause the app to stop functioning.

Example:

```typescript
plainLogger.debug('This is a debug message');
plainLogger.info('This is an info message');
plainLogger.warn('This is a warning');
plainLogger.error('An error occurred');
plainLogger.fatal('A fatal error occurred');
```

### 3. Contextual Logging
You can add contextual data to your logs, which will appear as structured fields in JSON mode and as key-value pairs in plain-text mode.

```typescript
jsonLogger.info('Fetching user details', { userId: 789, action: 'fetch' });
plainLogger.error('Failed to fetch user details', { userId: 789, errorCode: 500 });
```

JSON Output Example:
```bash
{
  "timestamp": "2024-09-21T12:00:00.000Z",
  "level": "info",
  "message": "Fetching user details",
  "context": {
    "userId": 789,
    "action": "fetch"
  }
}
```

Plain-text Output Example:
```bash
[2024-09-21T12:00:00.000Z] [INFO] Fetching user details | userId: 789, action: fetch
```

### 4. Configuration:

- `Log Levels`:  
The log level can be configured when creating a Logger instance. Logs below the specified level will be ignored.

```typescript
const logger = new Logger(LogLevel.Warn, LogMode.Plain);
// This will not log since it's below the Warn level
logger.info('This will not be logged');
```

- `Log Modes`:  
< log supports two log modes:

1. JSON: Structured logging, with each message and context serialized as JSON.
2. Plain-text: Colorized logs with key-value pairs for context.

```typescript
const logger = new Logger(LogLevel.Info, LogMode.Json);
```

### 5. Colored Output for Plain-text

Log levels are colorized for easier reading in plain-text mode:

- `debug`: Magenta
- `info`: Blue
- `warn`: Yellow
- `error`: Red
- `fatal`: White text on a red background
