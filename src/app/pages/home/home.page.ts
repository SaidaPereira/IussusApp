import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public home: string;
  constructor(private activatedRoute: ActivatedRoute,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
  }
  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Albums',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       id: 'delete-button',
  //       data: {
  //         type: 'delete'
  //       },
  //       handler: () => {
  //         console.log('Delete clicked');
  //       }
  //     }, {
  //       text: 'Share',
  //       icon: 'share',
  //       data: 10,
  //       handler: () => {
  //         console.log('Share clicked');
  //       }
  //     }, {
  //       text: 'Play (open modal)',
  //       icon: 'caret-forward-circle',
  //       data: 'Data value',
  //       handler: () => {
  //         console.log('Play clicked');
  //       }
  //     }, {
  //       text: 'Favorite',
  //       icon: 'heart',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }

  
}
