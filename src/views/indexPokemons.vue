<template>
  <ion-page>
    <ion-content :fullscreen="true" id="content-index">
      <ion-button @click="toggleInfiniteScroll()" expand="block">
        Toggle Infinite Scroll
      </ion-button>
      <div class="contain" :v-if="pokemons.lenght>2">
        <ion-card class="ion-card-index" v-for="(pokemon,index) in pokemons" :key="index">
          <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemon.id+'.png'" alt="" style="min-width: 100%; height: 256;">
          
          <ion-card-header>
            <ion-card-subtitle> {{pokemon.name}}</ion-card-subtitle>
            <ion-card-title>Abilidades</ion-card-title>
          </ion-card-header>

          <ion-card-content>

            <p>
                {{pokemons[index].abilities[0].ability.name}}, <span v-if="pokemons[index].abilities[1]"> {{pokemons[index].abilities[1].ability.name}}</span>
            </p>
            <!-- Keep close to Nature's heart... and break clear away, once in awhile, -->
            <!-- and climb a mountain or spend a week in the woods. Wash your spirit clean. -->
          </ion-card-content>
            <ion-button expand="full"  color="secondary" @click="addFavorites(pokemon.id)" >Agregar a favoritos</ion-button>
        </ion-card>
      </div>

      <div class="contain" v-if="loading===false">
        <ion-card class="ion-card-index">
            <ion-skeleton-text style="width: 300px;height: 156px;" :animated="true"></ion-skeleton-text>
          <ion-card-header>
            <ion-card-subtitle> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-subtitle>
            <ion-card-title> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
          </ion-card-content>

          <ion-button expand="full"  color="secondary">
            <ion-skeleton-text style="width: 300px;" :animated="true"></ion-skeleton-text>
          </ion-button>
        </ion-card>


          <ion-card class="ion-card-index">
            <ion-skeleton-text style="width: 300px; height: 156px;" :animated="true"></ion-skeleton-text>
          <ion-card-header>
            <ion-card-subtitle> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-subtitle>
            <ion-card-title> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
          </ion-card-content>

          <ion-button expand="full"  color="secondary">
            <ion-skeleton-text style="width: 300px;" :animated="true"></ion-skeleton-text>
          </ion-button>
        </ion-card>


        <ion-card class="ion-card-index">
            <ion-skeleton-text style="width: 300px; height: 156px;" :animated="true"></ion-skeleton-text>
          <ion-card-header>
            <ion-card-subtitle> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-subtitle>
            <ion-card-title> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
          </ion-card-content>

          <ion-button expand="full"  color="secondary">
            <ion-skeleton-text style="width: 300px;" :animated="true"></ion-skeleton-text>
          </ion-button>
        </ion-card>

        <ion-card class="ion-card-index">
            <ion-skeleton-text style="width: 300px; height: 156px;" :animated="true"></ion-skeleton-text>
          <ion-card-header>
            <ion-card-subtitle> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-subtitle>
            <ion-card-title> <ion-skeleton-text style="width: 100px;" :animated="true"></ion-skeleton-text> </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
            <ion-skeleton-text style="width: 260px;" :animated="true"></ion-skeleton-text>
          </ion-card-content>

          <ion-button expand="full"  color="secondary">
            <ion-skeleton-text style="width: 300px;" :animated="true"></ion-skeleton-text>
          </ion-button>
        </ion-card>

        
      </div>
        <ion-infinite-scroll
        threshold="5px" 
        id="infinite-scroll"
        :disabled="isDisabled"
        @ionInfinite="loadData($event)"
        >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Cargando mas pokemones...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, ref } from 'vue';
import { IonPage, 
IonContent, 
IonCard, 
IonCardContent, 
IonCardHeader,
IonCardTitle, 
IonCardSubtitle, 
IonButton, 
IonSkeletonText,
IonInfiniteScroll,
IonInfiniteScrollContent,
InfiniteScrollCustomEvent
} from '@ionic/vue';
import axios from 'axios'

  export default  defineComponent({
    name: 'indexPokemons',
    components: { IonContent, IonPage,IonCard, IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButton, IonSkeletonText, IonInfiniteScroll, IonInfiniteScrollContent   },
    data(){
      return{
        pokemons:[] as any,
        loading: true,
        indexPageScroll:0,
        isDisabled:false
      }
    },
    methods:{
      toggleInfiniteScroll(){
        this.isDisabled = false
      }
      ,
      fetchPokemons(){
        this.loading = false
        return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${this.indexPageScroll}`).then((res) =>{
            for (let i = 0; i < res.data.results.length; i++) {
                let urlPokemons = res.data.results[i].url.split("/") 
                res.data.results[i].id = parseInt(urlPokemons[6]) 
                axios.get(`https://pokeapi.co/api/v2/pokemon/${urlPokemons[6]}`).then((abilities)=>{
                  res.data.results[i].abilities = abilities.data.abilities
                  this.pokemons.push(res.data.results[i]);
                })
            }
         })
      },
      loadData(ev: InfiniteScrollCustomEvent){
        this.indexPageScroll+=10
            if(this.indexPageScroll===1000){
                ev.target.disabled = true
            }
          this.fetchPokemons()
            ev.target.complete()
      },
      addFavorites(id:number){
        if(localStorage.getItem('favoritesPokemons')){
          let pokemons = localStorage.getItem('favoritesPokemons')
          let favorites = pokemons? JSON.parse(pokemons): null;
          if(favorites.includes(id)) return 
          favorites?.push(id)
          localStorage.setItem('favoritesPokemons',JSON.stringify(favorites))
        }else{
          let favorites = [id]
          localStorage.setItem('favoritesPokemons', JSON.stringify(favorites))
        }
      }

    },
    
    created(){
      this.fetchPokemons()
    },
    // computed:{
    //   tenPokemons() {
    //     return this.pokemons
    //   }
    // }
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

.alert-head.sc-ion-alert-md {
  text-align: center !important;
}
</style>















