<template>
  <ion-page>
    <ion-content :fullscreen="true" id="content-index">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Tab 2 page" /> -->
        <ion-grid class="contain-battle">
              <ion-row class="row">
                <ion-col class="ion-align-self-start">
                  <div class="contain-image-pokemons" id="pokemon-computer">
                    <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonComputer+'.png'"
                    ref="imagePokemonCompute" 
                    alt="tienes problemas de conexion vuelve a intentar" style="transition: all 1s; min-width: 100%; height: 256;">
                    <div class="contain-hp-pokemons">
                        <div class="contain-hp" >
                          <hr class="hp" id="hpCompute" ref="hpCompute">
                        </div>
                          <p>{{hpPokemonComputer}}%</p>
                    </div>
                  </div>
                </ion-col>
            </ion-row>
            <ion-row class="row">
                <ion-col class="pokemon-player">
                  <div class="contain-image-pokemons">
                    <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonPlayer+'.png'"
                    ref="imagePokemonPlayer" 
                    alt="tienes problemas de conexion vuelve a intentar" style="min-width: 100%; height: 256;">
                    <div class="contain-hp-pokemons">
                        <div class="contain-hp">
                          <hr class="hp" id="hpPlayer" ref="hpPlayer">
                        </div>
                          <p>{{hpPokemonPlayer}}%</p>
                    </div>
                  </div>
                </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="contain-moves">
                    <ion-button color="secondary" @click="game(0)">atacar</ion-button>
                    <ion-button color="secondary" @click="game(1)">Super ataque</ion-button>
                    <ion-button color="secondary" @click="game(2)">Defensa</ion-button>
                </div>
              </ion-col>
            </ion-row>
        </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { IonPage, IonContent, IonGrid, IonRow,IonCol, alertController } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonContent, IonPage,IonCol, IonGrid, IonRow },
  data(){
    return{
      pokemonComputer:Math.floor(Math.random() * 800),
      hpPokemonComputer: 100,
      hpPokemonPlayer: 100,
      pokemonPlayer:Math.floor(Math.random() * 800),

    }
  },
  methods:{
    game(electionPlayer:number){
      // 0 = ataque
      // 1 = super ataque
      // 2 = defensa
      let electionComputer = Math.floor(Math.random() * 3)
      /////////////////////// Election 0 //////////////////////////
      if(electionPlayer===0 && electionComputer === 0 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataquePlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        this.valueATack(ataquePlayer,ataqueComputer)
      }

      if(electionPlayer===0 && electionComputer === 1 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataquePlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        ataqueComputer += 10
        this.valueATack(ataquePlayer,ataqueComputer)
      }

      if(electionPlayer===0 && electionComputer === 2 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataque = Math.floor(Math.random() * 100)
        let defensaComputer = Math.floor(Math.random() * 100)
        let hp = this.$refs.hpCompute as HTMLElement
        // document.getElementById('hpCompute') as HTMLElement
        let left = window.getComputedStyle(hp)
        let valueLeft = left.getPropertyValue('left')
        if(ataque < defensaComputer){
          this.hpPokemonComputer-=1
          let life = parseInt(valueLeft) + 2          
          hp? hp.style.left=`${life}px` : null
        }else{
          ataque = ataque - defensaComputer
          this.hpPokemonComputer = this.hpPokemonComputer - ataque
          // ataque*=2
          let life = parseInt(valueLeft) + Math.abs(ataque)
          hp? hp.style.left=`${Math.abs(life)}px` : null
        }
      }

      /////////////////////// Election 1 //////////////////////////

      if(electionPlayer===1 && electionComputer === 0 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataquePlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        ataquePlayer += 10
        this.valueATack(ataquePlayer,ataqueComputer)
        this.win(this.hpPokemonPlayer,this.hpPokemonComputer)
      }
      if(electionPlayer===1 && electionComputer === 1 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataquePlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        ataquePlayer+= 10
        ataqueComputer += 10
        this.valueATack(ataquePlayer,ataqueComputer)
      }
      if(electionPlayer===1 && electionComputer === 2 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let ataque = Math.floor(Math.random() * 100)
        let defensaComputer = Math.floor(Math.random() * 100)
        ataque+=10
        let hp = this.$refs.hpCompute as HTMLElement 
        // document.getElementById('hpCompute') as HTMLElement
        let left = window.getComputedStyle(hp)
        let valueLeft = left.getPropertyValue('left')
        if(ataque < defensaComputer){
          this.hpPokemonComputer-=1
          let life = parseInt(valueLeft) + 2          
          hp? hp.style.left=`${life}px` : null
        }else{
          ataque = ataque - defensaComputer
          this.hpPokemonComputer = this.hpPokemonComputer - ataque
          ataque*=2
          valueLeft+= Math.abs(ataque)
          hp? hp.style.left=`${ataque}px` : null
        }
      }

      /////////////////////// Election 2 //////////////////////////


      if(electionPlayer===2 && electionComputer === 0 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let defensaPlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        let hp = this.$refs.hpPlayer as HTMLElement

        // document.getElementById('hpPlayer') as HTMLElement
        let left = window.getComputedStyle(hp)
        let valueLeft = left.getPropertyValue('left')
        if(defensaPlayer > ataqueComputer){
          this.hpPokemonPlayer-=1
          let life = 2 + parseInt(valueLeft)
          hp? hp.style.left=`${life}px` : null
        }else{
          let ataque = ataqueComputer - defensaPlayer 
          this.hpPokemonPlayer - ataque
          // ataque*=2
          let life = Math.abs(ataque) +  parseInt(valueLeft)
          hp? hp.style.left=`${life}px` : null
        }
      }

      if(electionPlayer===2 && electionComputer === 1 && this.hpPokemonComputer > 0 && this.hpPokemonPlayer > 0){
        let defensaPlayer = Math.floor(Math.random() * 100)
        let ataqueComputer = Math.floor(Math.random() * 100)
        let hp =  this.$refs.hpPlayer as HTMLElement
        // document.getElementById('hpPlayer') as HTMLElement
        let left = window.getComputedStyle(hp)
        let valueLeft = left.getPropertyValue('left')
        ataqueComputer += 10
        if(defensaPlayer > ataqueComputer){
          this.hpPokemonPlayer-=1
          let life = 2 + parseInt(valueLeft)
          hp? hp.style.left=`${life}px` : null
        }else{
          let ataque = ataqueComputer - defensaPlayer
          this.hpPokemonPlayer = this.hpPokemonPlayer - ataque
          // ataque*=2
          let life = Math.abs(ataque) + parseInt(valueLeft)
          hp? hp.style.left=`${life}px` : null
         }
      }
      if(electionPlayer===2 && electionComputer === 2){
          console.log('no pasa nada')
      }
         this.win(this.hpPokemonPlayer,this.hpPokemonComputer)
    },
    win(hpPlayer:number,hpComputer:number){
        let player = this.$refs.hpPlayer as HTMLElement
        // document.getElementById('hpPlayer')
        let compute = this.$refs.hpCompute as HTMLElement
        // document.getElementById('hpCompute')
      if(hpPlayer<0 && hpComputer<0){
        player? player.style.left='250px':null
        compute? compute.style.left='250px':null
       return this.presentAlert(1, 'Empate')
      }
      if(hpPlayer<0){
        player? player.style.left='250px':null
        return this.presentAlert(2, 'Perdiste!')
      }
      if (hpComputer<0) {       
        compute? compute.style.left='250px':null
        return this.presentAlert(3, 'Ganaste!')
      }
    },
    sleep(ms:number){
      return new Promise(resolve => setTimeout(resolve, ms));
    },

   async valueATack(ataquePlayer:number,ataqueComputer:number){
     if(ataquePlayer > ataqueComputer){
                if(this.hpPokemonComputer < 0 || this.hpPokemonPlayer < 0) return

            ataquePlayer = ataquePlayer - ataqueComputer
            this.hpPokemonComputer = this.hpPokemonComputer - ataquePlayer
            let hp =  this.$refs.hpCompute as HTMLElement
            let imagePokemonCompute = this.$refs.imagePokemonCompute as HTMLElement
            //  document.getElementById('hpCompute') as HTMLElement
            // ataquePlayer*=2
            let left = window.getComputedStyle(hp)
            let valueLeft = left.getPropertyValue('left')
            let life = parseInt(valueLeft) + Math.abs(ataquePlayer)
            hp? hp.style.left=`${Math.abs(life)}px` : null
            for (let i = 0; i < 4; i++) {
                if(this.hpPokemonPlayer<=0 || this.hpPokemonComputer <=0) return
                imagePokemonCompute.classList.add('attack-move-left')
                await this.sleep(500)
                imagePokemonCompute.classList.remove('attack-move-left')
                await this.sleep(500)
                imagePokemonCompute.classList.add('attack-move-right')
                await this.sleep(500)
                imagePokemonCompute.classList.remove('attack-move-right')
            }
          }else{
            ataqueComputer =  ataqueComputer - ataquePlayer
            this.hpPokemonPlayer = this.hpPokemonPlayer - ataqueComputer
            let hp = this.$refs.hpPlayer as HTMLElement
            let imagePokemonPlayer = this.$refs.imagePokemonPlayer as HTMLElement
            // document.getElementById('hpPlayer') as HTMLElement
            let left = window.getComputedStyle(hp) 
            let valueLeft = left.getPropertyValue('left')
            // ataqueComputer*=2
            let life = parseInt(valueLeft) + Math.abs(ataqueComputer)
            hp? hp.style.left=`${Math.abs(life)}px` : null
            for (let i = 0; i < 4; i++) {
              if(this.hpPokemonPlayer<=0 || this.hpPokemonComputer <=0) return
                imagePokemonPlayer.classList.add('attack-move-left')
                await this.sleep(500)
                imagePokemonPlayer.classList.remove('attack-move-left')
                await this.sleep(500)
                imagePokemonPlayer.classList.add('attack-move-right')
                await this.sleep(500)
                imagePokemonPlayer.classList.remove('attack-move-right')
            }
          }
      },
       async presentAlert(winner:number , text:string){
        const alert = await alertController.create({
          header: `${text}, ¿desea jugar otra partida?`,
          cssClass: 'custom-alert',
          buttons: [
            {
              text: 'No',
              cssClass: 'alert-button-cancel',
            },
            {
              text: 'Yes',
              cssClass: 'alert-button-confirm',
              handler:()=>{
                let player = this.$refs.hpPlayer as HTMLElement
                // document.getElementById('hpPlayer')
                let compute = this.$refs.hpCompute as HTMLElement
                // document.getElementById('hpCompute')
                if(winner===1 || winner === 2){
                  this.hpPokemonComputer = 100 
                  this.hpPokemonPlayer = 100
                  this.pokemonPlayer = Math.floor(Math.random() * 800)
                  this.pokemonComputer = Math.floor(Math.random() * 800)
                  player? player.style.left = `${0}px` : null;
                  compute? compute.style.left = `${0}px` : null;

                }else if(winner === 3){
                    this.hpPokemonComputer = 100
                    this.pokemonComputer = Math.floor(Math.random() * 800)
                    compute? compute.style.left = `${0}px` : null;
                }
              }           
            },
          ],
        });
        await alert.present()
    }
  },
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
.contain-battle{
    margin-top: 85px;
    min-height: 100vh;
    width: 100%;
    max-height: 100%;
}
.row{
  min-height: 50%;
}
.contain-image-pokemons{
      width: 200px;
}
#pokemon-computer{
      margin-inline-start: auto;
}
.contain-hp-pokemons{
    display: flex;
    justify-content: center;
}
.contain-hp{
    display: flex;
    align-self: center;
    margin-right: 10px;
    overflow: hidden;
}
.hp{
    position: relative;
    background: rgb(255,0,0);
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,248,0,1) 50%, rgba(22,255,0,1) 100%);
    width: 200px;
    height: 3px;
    left: 0px;
}
#hpPlayer{
  left: 0px;
}
#hpCompute{
  left: 0px;
}
.contain-moves{
      display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.attack-move-left{
  transition: all 0.3s;
  margin-left: -35px;
}
.attack-move-right{
  transition: all 0.3s;
  margin-left: 35px;
}
@media screen and (min-height:900px){
  .contain-battle{
    position: fixed;
  }
}

@media screen and (min-width:550px) {
  .contain-image-pokemons{
      width: 250px;
  }
}

@media screen and (min-width:800px){
  .ion-align-self-start{
    width: 800px;
  }
}

@media screen and (min-width:1500px){
  .ion-align-self-start{
    width: 1000px;
  }
  .contain-image-pokemons{
      width: 300px;
  }
}

@media screen and (min-width:2500px){
  .contain-image-pokemons{
      width: 500px;
  }
}
</style>