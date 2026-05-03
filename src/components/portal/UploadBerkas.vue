<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-semibold mb-1">Upload Berkas Dokumen</h2>
          <div class="flex items-start gap-2 text-sm text-gray-500 mb-2">
            <CircleAlert class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />

            <div class="space-y-1">
              <p>
                Unggah dokumen pendukung dalam format JPG, PNG, atau PDF. Maks.
                2 MB per file.
              </p>
              <p>Pastikan terbaca dengan jelas.</p>
            </div>
          </div>
          <ol class="list-decimal list-inside text-sm text-gray-500 pl-6">
            <li>Foto Anak</li>
            <li>Kartu Keluarga</li>
            <li>Akta Kelahiran</li>
            <li>
              Kartu Identitas Anak (KIA)/KMS (Riwayat Imunisasi & Vaksinasi)
            </li>
          </ol>
        </div>
      </div>

      <div class="p-6">
        <!-- <div
          class="mb-5 rounded-lg bg-blue-50 text-blue-700 text-sm px-4 py-3 flex items-center gap-2"
        >
          <CircleAlert /> Pastikan dokumen terbaca jelas. Berkas yang tidak
          valid akan ditolak oleh panitia.
        </div> -->

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10"
        >
          <label
            v-for="doc in dokumen"
            :key="doc.key"
            :for="'file-' + doc.key"
            class="cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition hover:border-[#1181B2] hover:shadow-sm"
            :class="
              uploadedDocs[doc.key]
                ? 'border-[#1181B2] bg-[#1181B2]/5'
                : 'border-gray-200  border-dashed'
            "
          >
            <input
              type="file"
              class="hidden"
              :id="'file-' + doc.key"
              accept=".jpg,.jpeg,.png,.pdf"
              @change="handleUpload(doc.key, $event)"
            />

            <div
              class="mb-2"
              :class="
                uploadedDocs[doc.key] ? 'text-green-500' : 'text-[#1181B2]'
              "
            >
              <component :is="doc.icon" class="w-6 h-6" />
            </div>

            <div class="text-sm font-medium text-gray-800">
              {{ doc.label }}
            </div>

            <div class="text-xs text-gray-500 mb-2">
              {{ doc.hint }}
            </div>

            <div
              v-if="uploadedDocs[doc.key]"
              class="text-xs text-green-600 font-medium"
            >
              Berhasil diunggah
            </div>
            <div v-else class="text-xs text-gray-400">Klik untuk unggah</div>
          </label>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <!-- <button
            @click="activeTab = 'formulir'"
            class="text-sm text-gray-600 hover:text-black"
          >
            Kembali
          </button> -->

          <button
            @click="simpanBerkas"
            :disabled="!berkasLengkap"
            class="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition"
            :class="
              berkasLengkap
                ? 'bg-[#1181B2] hover:bg-[#0f6f98]'
                : 'bg-gray-300 cursor-not-allowed'
            "
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { CircleAlert, ImagePlus, FileUp } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { uploadBerkas } from "@/lib/services/pendaftaranService";
import { getPendaftaranId } from "@/lib/utils/storage";

const props = defineProps({
  pendaftaranId: {
    type: Number,
    required: true,
  },
});
const uploadedDocs = reactive({});
const emit = defineEmits(["saved"]);

const dokumen = [
  {
    key: "foto",
    label: "Pas Foto Anak",
    hint: "Background bebas",
    icon: ImagePlus,
  },
  {
    key: "kk",
    label: "Kartu Keluarga",
    hint: "Upload KK",
    icon: FileUp,
  },
  {
    key: "akta",
    label: "Akta Kelahiran",
    hint: "Upload Akta",
    icon: FileUp,
  },
  {
    key: "kia",
    label: "KIA/KMS",
    hint: "Upload KIA/KMS",
    icon: FileUp,
  },
];

const berkasLengkap = computed(() => {
  return dokumen.every((doc) => uploadedDocs[doc.key]);
});

const handleUpload = (key, event) => {
  const file = event.target.files[0];
  if (!file) return;

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    showWarning("Maksimal ukuran file 2MB");
    return;
  }

  uploadedDocs[key] = file;
};

const simpanBerkas = async () => {
  if (!props.pendaftaranId) {
    showWarning("Silakan isi formulir terlebih dahulu");
    return;
  }

  try {
    const payload = {
      kk: uploadedDocs.kk,
      foto: uploadedDocs.foto,
      kia: uploadedDocs.kia,
      akta: uploadedDocs.akta,
    };

    console.log("Uploading berkas with payload:", payload);

    await uploadBerkas(props.pendaftaranId, payload);

    showSuccess("Berkas berhasil diupload");

    emit("saved");
  } catch (err) {
    console.log(err);

    if (err.errors && Object.keys(err.errors).length) {
      const firstError = Object.values(err.errors)[0][0];
      showWarning(firstError);
    } else if (err.message) {
      showWarning(err.message);
    } else {
      showError("Terjadi kesalahan saat upload berkas");
    }
  }
};
</script>

<style lang="scss" scoped></style>
