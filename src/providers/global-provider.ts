import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController, App } from 'ionic-angular';
import { Transfer } from 'ionic-native';
import { HttpContents, showToast, constVar, globalVar } from '../common/global';
import { HttpGet } from './http-get';

@Injectable()
export class GlobalProvider {

  constructor(private toastCtrl: ToastController,public http: Http) {}
  presentToast(mag) {
    let toast = this.toastCtrl.create({
      message: mag,
      duration: 2000,
      position: 'middle',
      cssClass:'myToastStr'
    });
    toast.present();
  }
    uploadPhotos(paths, url, callback) {

    let successResponseArray = [];
    const fileTransfer = new Transfer();
    let options: any;
    let count = 0;
    options = {
      fileName: '',
      headers: { 'App-Agent': HttpContents.app_agent }
    }

    if (typeof paths != 'undefined' && paths != null && paths.length > 0) {
      unploadOneFile(paths[0], callback);
    } else {
      console.log('paths error');
      showToast("图片上传失败！");
    }
     function unploadOneFile(file_path, callback) {
      options.fileName = new Date().getTime() + '.jpg';
      fileTransfer.upload(file_path, url, options)
        .then((data) => {
          console.log('upload result==' + JSON.stringify(data));
          // "upload result=={"bytesSent":62052,"responseCode":200,"response":"{\"success\":true,\"retcode\":0,\"fileid\":\"0pguerkrck75kfsgcg7m6alqh7.jpg\",\"filename\":\"1496202407735.jpg\",\"filelength\":61940}", "objectId":"" } ", source: file:///android_asset/www/build/main.js (25923)


          let res = JSON.parse(data.response);
          if (res.success) {
            console.log("第" + (count + 1) + "张图片上传成功！");
            // showToast("第" + (count + 1) + "张图片上传成功！");
            successResponseArray.push(res);

            if (count == paths.length - 1) {
              console.log("所有图片上传完成！");
              // showToast("图片上传完成！");
              callback(successResponseArray);
            } else {
              count++;
              unploadOneFile(paths[count], callback);
            }

          } else {
            showToast(res.retinfo);

          }
        }, (err) => {
          // error
          console.log('upload error');
          showToast("图片上传失败！");
        })
    }

  }
}
