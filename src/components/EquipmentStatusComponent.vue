<template>
  <div>
    <v-card class="mx-auto" width="550" outlined>
      <div class="text-overline mb-4">
        {{ equipmentOwner }}/{{ equipmentId }}
      </div>
      <v-card-title class="title-font">
        {{ equipmentId }}
        <v-spacer> </v-spacer>
        <v-badge
          :color="equipmentStatus === 'ONLINE' ? '#00FF00' : '#808080'"
          inline
        >
        </v-badge>
      </v-card-title>
      <v-card-subtitle class="sub-title">
        Client: {{ equipmentOwner }}<br />
        Since: {{ equipmentSince }}<br />
        Status: {{ equipmentStatus }}
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="setShow">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show" class="div-x">
          <v-divider></v-divider>
          <v-card-text class="card-text">{{ kijoStream }} </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SSEClient } from "vue-sse";

@Component
export default class EquipmentStatusComponent extends Vue {
  @Prop(String) equipmentId!: string;
  @Prop(String) equipmentStatus!: string;
  @Prop(String) equipmentSince!: string;
  @Prop(String) equipmentOwner!: string;

  show = false as boolean;
  kijoStream = "" as string;
  sseClient = null as unknown as SSEClient;
  setShow(): void {
    this.show = !this.show;
    if (this.show === true) {
      this.kijoStream = "";
      this.sseClient = this.$sse.create({
        url: `http://localhost:2308/getKijo/${this.equipmentOwner}/${this.equipmentId}`,
        format: "json",
        withCredentials: false,
        polyfill: true,
      });

      this.sseClient
        .on(
          "message",
          (msg: { msg: string }) => (this.kijoStream += "\n" + msg.msg)
        )
        .on("error", (err: Error) =>
          console.error("Failed to parse or lost connection:", err)
        )
        .connect()
        .catch((err: Error) =>
          console.error("Failed make initial connection:", err)
        );
    } else {
      this.sseClient.disconnect();
      this.kijoStream = "";
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
  font-size: 12px;
  color: rgb(0, 17, 255);
}
.card-text {
  font-family: "Roboto", sans-serif;
  flex-grow: 1;
  overflow: auto;
  scroll-behavior: auto;
  height: 100px;
}
.text-overline {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  padding-top: 10px;
  padding-left: 10px;
}
</style>
