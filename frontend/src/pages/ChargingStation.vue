<template>
  <div class="h-[calc(100vh-64px)] w-full bg-[#06202B] overflow-hidden">
    <div class="w-full flex flex-col justify-start md:px-14 px-4 py-4 h-full">
      <form
        class="flex w-full gap-2 mb-4 justify-center items-center"
        @submit.prevent="handleSubmit"
      >
        <input
          v-model="searchName"
          @input="handleSubmit"
          type="text"
          placeholder="Search"
          class="w-full border-b border-white text-white px-4 pt-1 bg-transparent focus:outline-none"
        />
        <button type="submit">
          <Search color="white" />
        </button>
        <button
          v-if="user && user.role === 'admin'"
          class="flex items-center justify-center gap-0.5 bg-black text-white rounded-full px-4 py-2"
          @click.prevent="startCreateStation"
        >
          <span class="font-bold md:font-semibold text-lg"> + </span>
          <span class="hidden md:inline text-lg">Create</span>
        </button>
      </form>

      <div
        class="flex flex-wrap gap-4 overflow-y-auto md:px-5 py-5 no-scrollbar justify-center"
        style="max-height: calc(100% - 50px)"
      >
        <Skeleton v-if="loading" />

        <template v-else>
          <div
            v-for="station in filteredStations"
            :key="station.id"
            class="text-gray-800 border-none p-4 rounded w-[300px] bg-[#F6F4F0] shadow-md shadow-[rgba(255,255,255,0.5)] flex flex-col justify-between"
          >
            <div>
            <div class="flex justify-between items-center pb-3">
              <span class="font-bold text-xl">{{ station.name }}</span>
              <span
                :class="{
                  'text-green-500 text-sm': station.status === 'Active',
                  'text-red-500 text-sm': station.status !== 'Active',
                }"
              >
                {{ station.status }}
              </span>
            </div>
            <div class="flex justify-between text-sm text-gray-700 pl-0.5">
              <span>{{ type[station.type] }} :</span>
              <span>{{ station.poweroutput }} kW</span>
            </div>
            <div class="flex items-center text-sm text-gray-700 mt-2 gap-0.5">
              <div class="w-4 h-full">
                <MapPin size="16px" />
              </div>
              <span class="text-sm">{{ station.locationName }}</span>
            </div>
            </div>
            <div class="pt-4 flex gap-2 items-center" v-if="user && user.role === 'admin'">
              <button 
                class="flex items-center gap-0.5 text-sm text-white px-4 py-1 bg-[#06202B] rounded border-2 border-[#06202B]"
                @click.prevent="startUpdateStation(station)"
              >
                <Pencil size="16px" />
                <span>Edit</span>
              </button>
              <button
                class="flex items-center gap-0.5 text-sm px-3 py-1 text-[#06202B] rounded bg-transparent border-2 border-[#06202B]"
                @click.prevent="startDeleteStation(station._id)"
              >
                <CircleX size="16px" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </template>

        <div class="w-full h-[30vh] bg-transparent"></div>
      </div>
    </div>

    <!-- Update Modal -->
    <CreateStation v-if="createStation" @cancel="cancelCreateStation" @create="submitCreate" />
    <UpdateStation
      v-if="updateStation"
      :item="updateStation"
      @cancel="cancelUpdateStation"
      @save="submitUpdate"
    />

    <DeleteStation
      v-if="deleteStation"
      :item="deleteStation"
      @cancel="cancelDeleteStation"
      @delete="submitDelete"
    />
    <Filter @apply-filters="onApplyFilters" />
  </div>
</template>

<script setup>
import { BASE_URL } from "@/config";
import { CircleX, Pencil, Search, MapPin, Delete } from "lucide-vue-next";
import { inject, onMounted, ref } from "vue";
import Skeleton from "@/components/Skeleton.vue";
import UpdateStation from "@/components/UpdateStation.vue";
import DeleteStation from "@/components/DeleteStation.vue";
import CreateStation from "@/components/CreateStation.vue";
import Filter from "@/components/Filter.vue";

const user = inject("user");
const searchName = ref("");
const filteredStations = ref([]);
const stationsData = ref([]);
const updateStation = ref(null);
const loading = ref(true);
const deleteStation = ref(null);
const createStation = ref(false);

const type = {
  ac_level_1: "AC Level 1",
  ac_level_2: "AC Level 2",
  dc_ccs: "DC CCS",
  "dc_GB/T": "DC GB/T",
};

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/charger`);
    if (!response.ok) {
      alert("Network response was not ok");
      return;
    }
    const { chargers } = await response.json();
    setTimeout(() => {
      stationsData.value = chargers;
      filteredStations.value = chargers;
      loading.value = false;
    }, 1000); // simulate loading
  } catch (error) {
    alert("Error fetching stations");
    loading.value = false;
  }
});

const handleSubmit = () => {
  const search = searchName.value.toLowerCase();
  if (search === "") {
    filteredStations.value = stationsData.value;
    return;
  }
  filteredStations.value = stationsData.value.filter((station) =>
    [station.name, station.stateName, station.locationName].some((val) =>
      val?.toLowerCase().includes(search)
    )
  );
};
//create station

const startCreateStation = () => {
  createStation.value = true;
};

const cancelCreateStation = () => {
  createStation.value = false;
};

const submitCreate = async (newStation) => {
  try {
    const response = await fetch(`${BASE_URL}/charger/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ ...newStation }),
    });
    if (!response.ok) {
      return alert("Provide valid data");
    }
    const { station } = await response.json();
    stationsData.value.unshift(station);
  } catch (error) {
    alert("Error creating station");
  } finally {
    createStation.value = false;
  }
};
//update station
const startUpdateStation = (station) => {
  updateStation.value = { ...station }; // create a shallow copy
};

const cancelUpdateStation = () => {
  updateStation.value = null;
};

const submitUpdate = async (updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/charger/update/${updatedData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        latitude: updatedData.location[0],
        longitude: updatedData.location[1],
        name: updatedData.name,
        status: updatedData.status,
        type: updatedData.type,
        poweroutput: updatedData.poweroutput,
      }),
    });
    if (!response.ok) {
      console.error("Error updating station:", response.statusText);
      return alert("Error updating station");
    } else {
      const index = stationsData.value.findIndex((i) => i._id === updatedData._id);
      const filterIndex = stationsData.value.findIndex((i) => i._id === updatedData._id);
      if (index !== -1) {
        stationsData.value[index] = updatedData;
        if (filterIndex !== -1) {
          filteredStations.value[filterIndex] = updatedData;
        }
      }

      alert("Station updated successfully!");
    }
  } catch (error) {
    console.error("Error updating station:", error);
    alert("Error updating station");
  } finally {
    updateStation.value = null;
  }
};
//delete station
const startDeleteStation = (stationId) => {
  deleteStation.value = stationId;
};

const cancelDeleteStation = () => {
  deleteStation.value = null;
};

const submitDelete = async (stationId) => {
  try {
    const response = await fetch(`${BASE_URL}/charger/delete/${stationId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      return alert("Error deleting station");
    } else {
      const index = stationsData.value.findIndex((s) => s._id === stationId);
      const filterindex = filteredStations.value.findIndex((s) => s._id === stationId);
      if (index !== -1) {
        stationsData.value.splice(index, 1);
        if (filterindex !== -1) {
          filteredStations.value.splice(filterindex, 1);
        }
      }
      alert("Station deleted successfully!");
    }
  } catch (error) {
    alert("Error deleting station");
  } finally {
    deleteStation.value = null;
  }
};

const onApplyFilters = (filterRef) => {
  const search = searchName.value.toLowerCase();
  filteredStations.value = stationsData.value.filter((station) => {
    const statusMatch =
      filterRef.status === "all" || station.status.toLowerCase() === filterRef.status.toLowerCase();
    const typeMatch =
      filterRef.type === "all" || station.type.toLowerCase() === filterRef.type.toLowerCase();
    const outputMatch =
      (filterRef.min_output === null || station.poweroutput >= filterRef.min_output) &&
      (filterRef.max_output === null || station.poweroutput <= filterRef.max_output);
    const searchMatch =
      search === "" ||
      [station.name, station.stateName, station.locationName].some((val) =>
        val?.toLowerCase().includes(search)
      );
    return statusMatch && typeMatch && outputMatch && searchMatch;
  });
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
