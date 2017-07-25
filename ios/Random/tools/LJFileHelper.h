//
//  LJFileHelper.h
//  wenwenLife
//
//  Created by Marvin on 2016/11/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void(^FinishBlock) (NSInteger status,id data);

@interface LJFileHelper : NSObject<NSURLSessionDelegate>

+(LJFileHelper*)shared;

-(void)downloadFileWithURLString:(NSString*)urlString finish:(FinishBlock)finish;


@end
