<template>
  <div>
    <v-card class="mx-auto" max-width="344" width="100%">
      <v-card-title class="title-font">
        {{ equipmentId }} - {{ equipmentStatus }}
        <v-spacer> </v-spacer>
        <v-badge
          :color="equipmentStatus === 'ONLINE' ? '#00FF00' : '#808080'"
          inline
        ></v-badge>
      </v-card-title>
      <v-card-subtitle class="sub-title">
        Since: {{ equipmentSince }}
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="setShow">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>{{ kijoStream }} </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EquipmentStatusComponent extends Vue {
  @Prop(String) equipmentId!: string;
  @Prop(String) equipmentStatus!: string;
  @Prop(String) equipmentSince!: string;
  @Prop(String) equipmentOwner!: string;

  show = false as boolean;
  kijoStream = "" as string;
  setShow(): void {
    this.show = !this.show;
    if (this.show === true) {
      this.$sse
        .create(
          `http://localhost:2308/getKijo/${this.equipmentOwner}/${this.equipmentId}`
        )
        .on("message", (msg) => (this.kijoStream = msg))
        .on("error", (err) =>
          console.error("Failed to parse or lost connection:", err)
        )
        .connect()
        .catch((err) => console.error("Failed make initial connection:", err));
    }
  }
}
</script>
<style>
.title-font {
  font-family: "Roboto", sans-serif;
  color: black;
}
.sub-title {
  font-family: "Roboto", sans-serif;
  color: rgb(210, 210, 207);
}
</style>
