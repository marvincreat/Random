//
//  LJFileHelper.m
//  wenwenLife
//
//  Created by Marvin on 2016/11/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "LJFileHelper.h"

@implementation LJFileHelper


+(LJFileHelper*)shared{
  static LJFileHelper *sharedMyManager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedMyManager = [[[self class] alloc] init];
  });
  return sharedMyManager;
}
//开始下载文件
-(void)downloadFileWithURLString:(NSString*)urlString finish:(FinishBlock)finish{
  NSLog(@"download with url:%@",urlString);
  NSURL * url = [NSURL URLWithString:urlString];
  NSURLSessionConfiguration *defaultConfigObject = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *defaultSession = [NSURLSession sessionWithConfiguration: defaultConfigObject delegate:self delegateQueue: [NSOperationQueue mainQueue]];
  NSURLSessionDownloadTask * downloadTask =[defaultSession downloadTaskWithURL:url completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error)
                                            {
                                              if(error == nil)
                                              {
                                                NSLog(@"Temporary file =%@",location);
                                                NSError *err = nil;
                                                NSFileManager *fileManager = [NSFileManager defaultManager];
                                                NSString *docsDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
                                                NSString *filePath = [NSString stringWithFormat:@"%@/\%@",docsDir,@"bundle.zip"];
                                                NSString *fileDicPath = [NSString stringWithFormat:@"%@/\%@",docsDir,@"bundle"];

                                                NSString *mainjsPath = [NSString stringWithFormat:@"%@/\%@",docsDir,@"main.jsbundle"];
                                                NSString *assetsPath = [NSString stringWithFormat:@"%@/\%@",docsDir,@"assets"];

                                                NSURL *docsDirURL = [NSURL fileURLWithPath:filePath];
                                                NSURL *fileDirURL = [NSURL fileURLWithPath:fileDicPath];
                                                NSURL *mainjsDirURL = [NSURL fileURLWithPath:mainjsPath];
                                                NSURL *assetsDirURL = [NSURL fileURLWithPath:assetsPath];

                                                if([fileManager fileExistsAtPath:filePath]){
                                                  [fileManager removeItemAtURL:docsDirURL error:nil];
                                                }
                                                if([fileManager fileExistsAtPath:fileDicPath]){
                                                  [fileManager removeItemAtURL:fileDirURL error:nil];
                                                }

                                                if([fileManager fileExistsAtPath:mainjsPath]){
                                                  [fileManager removeItemAtURL:mainjsDirURL error:nil];
                                                }
                                                if([fileManager fileExistsAtPath:assetsPath]){
                                                  [fileManager removeItemAtURL:assetsDirURL error:nil];
                                                }

                                                if ([fileManager moveItemAtURL:location
                                                                         toURL:docsDirURL
                                                                         error: &err])
                                                {
                                                  NSLog(@"File is saved to =%@",docsDirURL.absoluteString);
                                                  finish(1,filePath);
                                                }
                                                else
                                                {
                                                  NSLog(@"failed to move: %@",[err userInfo]);
                                                  finish(0,nil);
                                                }
                                              }
                                            }];
  [downloadTask resume];
}

@end
