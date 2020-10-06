package com.weiming.xiguang;

import com.weiming.xiguang.util.HBaseConnClose;
import com.weiming.xiguang.util.HbaseUtil;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

/**陈开泰*/
@SpringBootApplication
public class XiguangApplication {

	@Bean
	public ExitCodeGenerator exitCodeGenerator(){
		return new HBaseConnClose();
	}

	public static void main(String[] args) throws IOException {
		SpringApplication.run(XiguangApplication.class, args);
		Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + "http://127.0.0.1:8081");
//		HbaseUtil.init();
	}

}
