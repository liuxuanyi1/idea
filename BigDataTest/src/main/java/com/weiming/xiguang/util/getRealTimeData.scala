package com.weiming.xiguang.util

import java.util.Properties

import jcifs.smb.{SmbFile, SmbFileInputStream}

import scala.io.Source

class GetRealTimeData {

  /**
   * 通过smb协议获取共享文件夹中的数据
   * @param fileName
   *
   */
  def getInfo(fileName:String):Array[String]= {
    val result = this.getClass.getClassLoader.getResourceAsStream("application.properties")
    val prop = new Properties()
    prop.load(result)
    val smbFile = new SmbFile(prop.getProperty( "share.url") + fileName)
    val reader = Source.fromInputStream(new SmbFileInputStream(smbFile))
    val results = reader.getLines().toArray
//    println(prop.getProperty( "share.url") + fileName)
//    for(i<- results){
//      println(i)
//    }
    results
  }
}
