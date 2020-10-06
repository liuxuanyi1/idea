package com.weiming.xiguang.util;

import org.springframework.boot.ExitCodeGenerator;

/**陈开泰
 * 2019/9/3*/
public class HBaseConnClose implements ExitCodeGenerator {

    @Override
    public int getExitCode() {
        HbaseUtil.close();
        System.err.println("HBase连接已关闭；内存清理完毕!");
        return 0000;
    }
}
