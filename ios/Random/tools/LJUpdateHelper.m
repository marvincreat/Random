//
//  LJUpdateHelper.m
//  wenwenLife
//
//  Created by Marvin on 2016/11/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#define RN_VERSION_KEY @"rn_version_key"
#define RN_JSVERSION_KEY @"rn_jsversion_key"

#import "LJUpdateHelper.h"

@implementation LJUpdateHelper

-(void)checkUpdateWithVersionInfo: (NSDictionary *)versionInfo finish:(FinishBlock)finish {
  
  //初始化版本缓存
  NSString *RNJSVersionStr = [[NSUserDefaults standardUserDefaults] objectForKey:RN_JSVERSION_KEY];
  if (!RNJSVersionStr) {
    [[NSUserDefaults standardUserDefaults] setObject:@"1.0.0" forKey:RN_JSVERSION_KEY];
    RNJSVersionStr = @"1.0.0";
  }

  //原生版本判断与更新状态返回
  NSString *Native_Version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  NSLog(@"Native_Version = %@", Native_Version);
  if (versionInfo){
    NSLog(@"versionResultInfo %@", versionInfo);
    NSString *vID = [versionInfo objectForKey:@"version"];
    NSString *minVersion = [versionInfo objectForKey:@"minversion"];
    if ([self newVersionIsBiggerByCompareOldVersion:Native_Version WithNewVersion:vID]) {
      if ([self newVersionIsBiggerByCompareOldVersion:Native_Version WithNewVersion:minVersion]) {
        finish(2,nil); //强制更新
      } else  finish(1,nil); //不强制更新
    }
    
    //JS版本判断与更新状态返回
    NSString *jsVersion = [versionInfo objectForKey:@"jsversion"];
    [[NSUserDefaults standardUserDefaults] setObject:jsVersion forKey:RN_JSVERSION_KEY];
    //这里只要不同就更新，便于版本回滚切换
    if (![RNJSVersionStr isEqualToString:jsVersion]) {
      finish(3,nil);//ji更新
    }else{
      finish(0,nil);
    }
  } else {
    NSLog(@"木有数据返回");
    finish(0,nil);
  }
  
}


- (BOOL)newVersionIsBiggerByCompareOldVersion: (NSString *)oldVersion WithNewVersion:(NSString *)newVersion {
  if ([oldVersion compare:newVersion options:NSNumericSearch] == NSOrderedDescending) {
    NSLog(@"%@ is bigger",oldVersion);
    return false;
  }else if([oldVersion compare:newVersion options:NSNumericSearch] == NSOrderedSame)
  {
    NSLog(@"%@ is same",newVersion);
    return false;

  } else {
    NSLog(@"%@ is bigger",newVersion);
    return true;

  }
  

}


@end
