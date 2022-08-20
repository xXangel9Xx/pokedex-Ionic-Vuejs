<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <img src="../assets/Logo.png" alt="">

        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="index" href="/tabs/index">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="battle" href="/tabs/battle">
          <!-- <ion-icon :icon="ellipse" /> -->
          <ion-icon :icon="gameControllerOutline" />
          <ion-label>Battle</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="favorites" href="/tabs/favorites">
          <ion-icon :icon="bookmarkOutline" />
          <ion-label>Favorites</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonHeader,IonToolbar,IonTitle } from '@ionic/vue';
import { gameControllerOutline, homeOutline,bookmarkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet,IonHeader,IonToolbar,IonTitle },
  setup() {
    return {
      bookmarkOutline,
      homeOutline,
      gameControllerOutline
    }
  }
});
</script>

<style>
@media screen and (min-height:100px) {
  ion-tabs{
    min-height: 100% !important;
  }
}
@media screen and (min-height:500px) {
ion-tabs{
    min-height: 600px;
}
}

 ion-alert.custom-alert {
    --backdrop-opacity: 0.5;
  }

  .custom-alert .alert-button-group {
    padding: 8px;
    display: flex;
    /* justify-content: space-around; */
  }
  .alert-title.sc-ion-alert-md{
     text-align: center; 
     font-weight: 1000;
  }

  button.alert-button.alert-button-confirm {
    background-color: var(--ion-color-success);
    color: var(--ion-color-success-contrast);
  }


  .md button.alert-button.alert-button-confirm {   
      border: solid 1px #999999;
      border-radius: 0px 8px 8px 0px;
  }
  .alert-button{
    width: 46%;
    /* justify-content: center !important; */
  }
  button.alert-button.alert-button-cancel{
    border: solid 1px #999999;
    border-radius: 8px 0px 0px 8px;
    margin-right: 0;
  }

.alert-button-inner{
  justify-content: center !important;
}
  .ios .custom-alert button.alert-button {
    border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
  }

  .ios button.alert-button.alert-button-cancel {
    border-right: 0;
    border-bottom-left-radius: 13px;
    border-top-left-radius: 13px;
  }
  .ios button.alert-button.alert-button-confirm {
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;
  }
</style>