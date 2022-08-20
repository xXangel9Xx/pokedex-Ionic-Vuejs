<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true" id="content-index">
      <div class="contain" :v-if="favorites.lenght>0">
        <ion-card class="ion-card-index" v-for="(pokemon,index) in favorites" :key="index">
          <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemon.id+'.png'" alt="" style="min-width: 100%; height: 256;">
          
          <ion-card-header>
            <ion-card-subtitle>{{pokemon.name}}</ion-card-subtitle>
            <ion-card-title>Abilidades</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>   {{pokemon.abilities[0].ability.name}}, {{pokemon.abilities[1].ability.name}}</p>
            <h1>Tipo: {{pokemon.types[0].type.name}}</h1>
          </ion-card-content>
            <ion-button expand="full"  color="secondary"  @click="presentAlert(index)" >Quitar de favoritos</ion-button>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { IonPage, 
IonHeader, 
IonCard,
IonToolbar, 
IonTitle, 
IonContent,
IonCardContent, 
IonCardHeader,
IonCardTitle, 
IonCardSubtitle, 
IonButton, 

// IonSkeletonText,
// IonInfiniteScroll,
// IonInfiniteScrollContent,
// InfiniteScrollCustomEvent,
alertController
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  name: 'Tab3Page',
  components: {   IonContent, IonPage, IonCard, IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButton },
  data(){
    return{
      favorites: [] as any 

    }
  },
  methods:{
    // removeFromFavorites(index)
    getFavorites(){
      let pokemonsID = localStorage.getItem('favoritesPokemons')
      if(!pokemonsID) return 
      pokemonsID = JSON.parse(pokemonsID)
      for (let i = 0;pokemonsID && i < pokemonsID.length; i++) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonsID[i]}`).then((res)=>{
          this.favorites.push(res.data)
        })  
      }

    },
    removeFromFavorites(index:number){
      let pokemonsID = localStorage.getItem('favoritesPokemons')
      if(!pokemonsID) return 
      let pokemons = JSON.parse(pokemonsID)
      pokemons = pokemons.filter(function(item:number,i:number) { return i !== index });
      localStorage.setItem('favoritesPokemons',JSON.stringify(pokemons))
      this.favorites = this.favorites.filter(function(item:number,i:number) { return i !== index })
    },
    async presentAlert(index:number){
        const alert = await alertController.create({
          header: 'Estas seguro?',
          cssClass: 'custom-alert',
          buttons: [
            {
              text: 'No',
              cssClass: 'alert-button-cancel',
            },
            {
              text: 'Yes',
              cssClass: 'alert-button-confirm',
              handler:()=>{this.removeFromFavorites(index)}
            },
          ],
        });
        await alert.present()
    }

  },
  created(){
    this.getFavorites()
  }
});
</script>

<style scoped>
#content-index::part(scroll){
  background-image: url('@/assets/Group.png');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
}
.contain{
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  padding-top: 70px;
  padding-bottom: 50px;   
}
.ion-card-index{
  width: 300px;
}
  ion-alert {
     --background: black !important;
  }


</style>


