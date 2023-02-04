import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
export class MyLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    try {
      fs.appendFile(
        'logging.txt',
        `🗨️ ${new Date().toLocaleString()} [LOG] ${message} ${'\n'}`,
        (err) => {
          if (err) throw err;
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    try {
      fs.appendFile(
        'logging.txt',
        `🔴️ ${new Date().toLocaleString()} [ERROR] ${message} ${'\n'}`,
        (err) => {
          if (err) throw err;
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    try {
      fs.appendFile(
        'logging.txt',
        `🔶️ ${new Date().toLocaleString()} [WARN] ${message} ${'\n'}`,
        (err) => {
          if (err) throw err;
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  debug?(message: any, ...optionalParams: any[]) {
    try {
      fs.appendFile(
        'logging.txt',
        `🔶️ ${new Date().toLocaleString()} [DEBUG] ${message} ${'\n'}`,
        (err) => {
          if (err) throw err;
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    try {
      fs.appendFile(
        'logging.txt',
        `🔵️ ${new Date().toLocaleString()} [VERBOSE] ${message} ${'\n'}`,
        (err) => {
          if (err) throw err;
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
}
