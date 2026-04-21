<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-semibold mb-1">
            Pembayaran Biaya Pendaftaran
          </h2>

          <div class="flex items-start gap-2 text-sm text-gray-500">
            <CircleAlert class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p>
              Lakukan transfer ke rekening berikut dan unggah bukti pembayaran.
            </p>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div
          class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          <div
            class="h-full border rounded-xl p-6 bg-gray-50 flex flex-col justify-between"
          >
            <div class="space-y-0">
              <div class="text-xs text-gray-500 mb-1">Transfer melalui</div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Bank BCA</h3>

              <div class="text-xl font-roboto-mono text-[#1181B2] mb-1">
                0123 0456 78
              </div>

              <div class="text-xs text-gray-600">
                a.n. Yayasan Pendidikan XYZ
              </div>
            </div>

            <div class="mt-6 pt-4 border-t">
              <div class="text-xs text-gray-500">Nominal Transfer</div>
              <div class="text-xl font-bold text-gray-800">Rp 100.000</div>
            </div>
          </div>

          <div class="h-full flex flex-col justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                Upload Bukti Transfer
              </h3>

              <label
                for="file-bukti"
                class="w-full h-[220px] cursor-pointer border-2 rounded-xl p-5 flex flex-col justify-center items-center text-center transition hover:border-[#1181B2] hover:shadow-sm"
                :class="
                  uploadedDocs.bukti_tf
                    ? 'border-[#1181B2] bg-[#1181B2]/5'
                    : 'border-gray-200 border-dashed'
                "
              >
                <input
                  type="file"
                  id="file-bukti"
                  class="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  @change="handleUpload('bukti_tf', $event)"
                />

                <div
                  class="mb-2"
                  :class="
                    uploadedDocs.bukti_tf ? 'text-green-500' : 'text-[#1181B2]'
                  "
                >
                  <FileUp class="w-7 h-7" />
                </div>

                <div class="text-sm font-medium text-gray-800">
                  Bukti Transfer
                </div>

                <div class="text-xs text-gray-500 mb-2">
                  Screenshot / foto struk transfer
                </div>

                <div
                  v-if="uploadedDocs.bukti_tf"
                  class="text-xs text-green-600 font-medium"
                >
                  Berhasil diunggah
                </div>
                <div v-else class="text-xs text-gray-400">
                  Klik untuk unggah
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button
            @click="submitPembayaran"
            :disabled="!uploadedDocs.bukti_tf"
            class="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition"
            :class="
              uploadedDocs.bukti_tf
                ? 'bg-[#1181B2] hover:bg-[#0f6f98]'
                : 'bg-gray-300 cursor-not-allowed'
            "
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { FileUp, CircleAlert } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { uploadPembayaran } from "@/lib/services/pendaftaranService";
import { getPendaftaranId } from "@/lib/utils/storage";

const pendaftaranId = ref(Number(getPendaftaranId()));
const uploadedDocs = reactive({});
const emit = defineEmits(["saved"]);

const handleUpload = async (key, event) => {
  const file = event.target.files[0];
  if (!file) return;

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    showWarning("Maksimal ukuran file 2MB");
    return;
  }

  uploadedDocs[key] = file;
};

const submitPembayaran = async () => {
  if (!pendaftaranId.value) {
    showWarning("Silakan isi formulir terlebih dahulu");
    return;
  }

  if (!uploadedDocs.bukti_tf) {
    showWarning("Bukti transfer wajib diupload");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("bukti_tf", uploadedDocs.bukti_tf);

    console.log("Uploading pembayaran...");

    await uploadPembayaran(pendaftaranId.value, formData);

    showSuccess("Pembayaran berhasil diupload");
  } catch (err) {
    console.log(err);

    if (err.errors && Object.keys(err.errors).length) {
      const firstError = Object.values(err.errors)[0][0];
      showWarning(firstError);
    } else if (err.message) {
      showWarning(err.message);
    } else {
      showError("Terjadi kesalahan saat upload pembayaran");
    }
  }
};
</script>

<style lang="scss" scoped></style>
