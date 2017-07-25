//
//  LJUpdateHelper.h
//  wenwenLife
//
//  Created by Marvin on 2016/11/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void(^FinishBlock) (NSInteger status,id data);

@interface LJUpdateHelper : NSObject

-(void)checkUpdateWithVersionInfo: (NSDictionary *)versionInfo finish:(FinishBlock)finish;

@end
