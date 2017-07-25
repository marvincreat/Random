//
//  LJBundleHelper.m
//  wenwenLife
//
//  Created by Marvin on 2016/11/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#define OLDVERSION @"oldVersion"

#import "LJBundleHelper.h"
#import <React/RCTBundleURLProvider.h>

@implementation LJBundleHelper

+(NSURL *)getBundlePath{
  #ifdef  DEBUG
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    return jsCodeLocation;
  #else
  //需要存放和读取的document路径
  //jsbundle地址,增加iosbundle是因为服务器名为iosbundle的压缩包解压会产生此文件夹
  //考虑压缩包解压，document下一开始没有iosbundle文件夹，所以要创建一个
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSString *docsDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  NSString *fileDicPath = [NSString stringWithFormat:@"%@/\%@",docsDir,@"bundle"];
  
  //这里进行覆盖操作，如果缓存里的版本号与当前版本不一致，删除JSBundle，assets的文件，从而保证从主目录加载最新的jsbundle文件
  NSString *OldVersionStr = [[NSUserDefaults standardUserDefaults] objectForKey:OLDVERSION];
  NSString *Native_Version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  NSLog(@"Native_Version = %@", Native_Version);
  
  //只要版本号不一样，就清空bundle文件夹，从APP里读取新版本的RN代码和资源，目的是解决新版本覆盖了老版本APP，但却没有更新的问题
  if (!OldVersionStr) {
    [[NSUserDefaults standardUserDefaults] setObject:Native_Version forKey:OLDVERSION];
  } else {
    if (![OldVersionStr isEqualToString:Native_Version]) {
      [[NSUserDefaults standardUserDefaults] setObject:Native_Version forKey:OLDVERSION];

      //执行清空操作
      NSURL *fileDirURL = [NSURL fileURLWithPath:fileDicPath];
      
      if([fileManager fileExistsAtPath:fileDicPath]){
        [fileManager removeItemAtURL:fileDirURL error:nil];
      }
    }
  }

  
  //下面的代码做的工作就一个，如果bundle文件夹里没jsbundle和assets，则从APP的Mainbundle里把相关文件copy到bundle文件夹，并返回路径让原生从bundle文件夹读取RN内容而不是从Mainbundle里读取，以便热更新可以正常在bundle文件夹解压和被原生读取使用
  
  BOOL isDir = FALSE;
  BOOL iOSBundleExist = [fileManager fileExistsAtPath:fileDicPath isDirectory:&isDir];
  
  if (!iOSBundleExist) {
    NSString *addDic = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0] stringByAppendingPathComponent:@"bundle"];
    [fileManager createDirectoryAtPath:addDic withIntermediateDirectories:YES attributes:nil error:nil];
  }

  NSString *jsCachePath = [NSString stringWithFormat:@"%@/\%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"bundle",@"main.jsbundle"];
  NSLog(@"###jsCachePath:%@",jsCachePath);
  
  //assets文件夹地址
  NSString *assetsCachePath = [NSString stringWithFormat:@"%@/\%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"bundle",@"assets"];
  NSLog(@"###assetsCachePath:%@",assetsCachePath);
  
  //判断JSBundle是否存在
  BOOL jsExist = [[NSFileManager defaultManager] fileExistsAtPath:jsCachePath];
  //如果已存在
  if(jsExist){
    NSLog(@"js已存在: %@",jsCachePath);
    //如果不存在，就用事先打包好的，把在根目录的mainjsbundle复制到可替换更新的文件夹下
  }else{
    NSString *jsBundlePath = [[NSBundle mainBundle] pathForResource:@"main" ofType:@"jsbundle"];
    
    NSError* error=nil;

    [[NSFileManager defaultManager] copyItemAtPath:jsBundlePath toPath:jsCachePath error:&error];
    
    //如果拷贝失败，为防止闪退，返回主目录的main.jsbundle
    if (error != nil) {
      NSLog(@"copyItem From Path:jsBundle To jsCachePath error : %@",[error userInfo]);
      return [NSURL URLWithString:jsBundlePath];
    }
    
    NSLog(@"js已拷贝至Document: %@",jsCachePath);
  }
  
  //判断assets是否存在
  BOOL assetsExist = [[NSFileManager defaultManager] fileExistsAtPath:assetsCachePath];
  //如果已存在
  if(assetsExist){
    NSLog(@"assets已存在: %@",assetsCachePath);
    //如果不存在，就用事先打包好的，把在根目录的assets文件夹复制到可替换更新的文件夹下
  }else{
    NSString *assetsBundlePath = [[NSBundle mainBundle] pathForResource:@"assets" ofType:nil];
    
    NSError* error=nil;
    
    [[NSFileManager defaultManager] copyItemAtPath:assetsBundlePath toPath:assetsCachePath error:&error];
    
    //如果拷贝失败，log一下就可以了，不用返回
    if (error != nil) {
      NSLog(@"copyItem From Path:assets To assetsCachePath error : %@",[error userInfo]);
    }
    
    NSLog(@"assets已拷贝至Document: %@",assetsCachePath);
    
  }
  return [NSURL URLWithString:jsCachePath];
  #endif
}



@end
