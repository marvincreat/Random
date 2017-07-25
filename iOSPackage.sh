

bundle=./ios/bundle

if [ -d "${bundle}" ]; then
	rm -rf ${bundle}
fi


mkdir ${bundle}
react-native bundle --platform ios --assets-dest ${bundle} --dev false --entry-file index.ios.js --bundle-output ${bundle}/main.jsbundle

zipFile=ios_bundle.zip
cd ios 
zip -r ${zipFile} bundle
mv ${zipFile} ~/Desktop

