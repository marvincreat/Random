//
//  RCTUpdateModule.m
//  tbtsgoods
//
//  Created by Marvin on 2017/6/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTUpdateModule.h"

#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
//用于热更新
#import "LJFileHelper.h"
#import "LJUpdateHelper.h"
#import "SSZipArchive.h"

@interface RCTUpdateModule ()<RCTBridgeModule>

@end

@implementation RCTUpdateModule

RCT_EXPORT_MODULE();

//检查版本条件
RCT_EXPORT_METHOD(checkVersion:(NSDictionary *)resultData andResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  if (!resultData || ![resultData isKindOfClass:[NSDictionary class]]) {
    return;
  }
  
  //更新检测
  LJUpdateHelper *updater = [[LJUpdateHelper alloc] init];
  [updater checkUpdateWithVersionInfo:resultData finish:^(NSInteger status, id data) {
    //status 0 不更新， 1，原生更新可选，2，原生必须更新，3，最常见的，jsbundle热更新
    if(status != 0){
      resolve(@{
                @"isNeedUpdateState":[NSNumber numberWithInteger:status]
                });
    }

  }
   ];
}

//前往更新js包
RCT_EXPORT_METHOD(gotoUpdateJS:(NSString *)jsUrl andResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  if (!jsUrl) {
    return;
  }
  
  //jsbundle更新采用静默更新
  //更新
  NSLog(@"jsbundleUrl is : %@",  jsUrl);
  [[LJFileHelper shared] downloadFileWithURLString:jsUrl finish:^(NSInteger status, id data) {
    if(status == 1){
      NSLog(@"下载完成");
      NSError *error;
      NSString *filePath = (NSString *)data;
      NSString *desPath = [NSString stringWithFormat:@"%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0]];
      [SSZipArchive unzipFileAtPath:filePath toDestination:desPath overwrite:YES password:nil error:&error];
      if(!error){
        resolve([NSNumber numberWithBool:true]);
        NSLog(@"解压成功");
      }else{
        resolve([NSNumber numberWithBool:false]);
        NSLog(@"解压失败");
      }
    }
  }];

  reject = nil;
}


//跳转app store
RCT_EXPORT_METHOD(updateNative:(NSDictionary *)updateInfo){
  if (!updateInfo || ![updateInfo isKindOfClass:[NSDictionary class]]) {
    return;
  }
  NSNumber *updateState = [updateInfo objectForKey:@"updateState"];
  NSString *url = [updateInfo objectForKey:@"url"];

  if (url) {
    NSURL * appstore = [NSURL URLWithString:url];
    if ([[UIApplication sharedApplication] canOpenURL:appstore]) {
      [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
      if ([updateState intValue] == 2) {
        exit(0);
      }
    }
  }
}

@end
