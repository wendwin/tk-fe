<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-medium text-slate-800 mb-1">
            Pembayaran Biaya Pendaftaran
          </h2>

          <div class="flex items-start gap-2 text-sm text-gray-500">
            <CircleAlert class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div class="">
              <p>
                Lakukan transfer sesuia nominal ke rekening berikut dan unggah
                bukti pembayaran.
              </p>
              <p>
                Jika ada kendala, silakan hubungi admin untuk bantuan lebih
                lanjut.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="py-3 px-5 border flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div :class="statusIconClass">
              <component
                :is="statusIcon"
                class="w-5 h-5"
                :class="{
                  'animate-pulse': props.statusPembayaran === 'pending',
                }"
              />
            </div>

            <div>
              <div class="text-sm font-semibold text-gray-800">
                Status Pembayaran
              </div>

              <div class="text-xs text-gray-500 mt-0.5">
                {{ statusLabel }}
              </div>
            </div>
          </div>

          <div
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="statusPillClass"
          >
            {{ statusText }}
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
                class="w-full h-[220px] border-2 rounded-xl p-5 flex flex-col justify-center items-center text-center transition"
                :class="[
                  canUpload
                    ? 'cursor-pointer hover:border-[#1181B2] hover:shadow-sm'
                    : 'cursor-not-allowed opacity-60',

                  uploadedDocs.bukti_tf
                    ? 'border-[#1181B2] bg-[#1181B2]/5'
                    : 'border-gray-200 border-dashed',
                ]"
              >
                <input
                  type="file"
                  id="file-bukti"
                  class="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  :disabled="!canUpload"
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
            :disabled="!uploadedDocs.bukti_tf || !canUpload"
            class="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition"
            :class="
              uploadedDocs.bukti_tf && canUpload
                ? 'bg-[#1181B2] hover:bg-[#0f6f98]'
                : 'bg-gray-300 cursor-not-allowed'
            "
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { uploadPembayaran } from "@/lib/services/pendaftaranService";
import { getPendaftaranId } from "@/lib/utils/storage";

import {
  CircleAlert,
  FileUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-vue-next";

const uploadedDocs = reactive({});
const props = defineProps({
  statusPembayaran: {
    type: String,
    default: "unpaid",
  },
  pendaftaranId: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["saved", "update-status"]);

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

const canUpload = computed(() => {
  return (
    props.statusPembayaran === "unpaid" || props.statusPembayaran === "failed"
  );
});

const submitPembayaran = async () => {
  if (!props.pendaftaranId) {
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

    await uploadPembayaran(props.pendaftaranId, formData);

    // update ke parent
    emit("update-status", "pending");
    showSuccess("Pembayaran berhasil diupload");
    emit("saved");
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

const statusText = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "Belum Bayar";
    case "pending":
      return "Menunggu Verifikasi";
    case "paid":
      return "Terverifikasi";
    case "":
      return "Ditolak";
    default:
      return "-";
  }
});

const statusLabel = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "Silakan upload bukti pembayaran";
    case "pending":
      return "Pembayaran sedang diverifikasi admin";
    case "paid":
      return "Pembayaran sudah diverifikasi";
    case "":
      return "Bukti pembayaran ditolak, silakan upload ulang";
    default:
      return "";
  }
});

const statusBadgeClass = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "bg-gray-50 border-gray-200";
    case "pending":
      return "bg-yellow-50 border-yellow-200";
    case "paid":
      return "bg-green-50 border-green-200";
    case "":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
});

const statusPillClass = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "bg-gray-200 text-gray-700";
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "paid":
      return "bg-green-200 text-green-800";
    case "":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200";
  }
});

const statusIconClass = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "text-gray-500";
    case "pending":
      return "text-yellow-500";
    case "paid":
      return "text-green-500";
    case "":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
});

const statusIcon = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return CircleAlert;
    case "pending":
      return Clock;
    case "paid":
      return CheckCircle;
    case "":
      return XCircle;
    default:
      return CircleAlert;
  }
});
</script>

<style lang="scss" scoped></style>
