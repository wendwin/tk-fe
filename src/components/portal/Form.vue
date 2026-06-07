<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-medium text-slate-800">
            Formulir Pendaftaran
          </h2>
          <p class="text-sm text-gray-500">
            Isi data peserta didik, data kesehatan, data orang tua, dan
            informasi tambahan dengan lengkap.
          </p>
        </div>
      </div>

      <form @submit.prevent="simpanFormulir">
        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <School />Pilihan Pendaftaran
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  for="jenis"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Jenis <span class="text-red-500">*</span>
                </label>
                <select
                  id="jenis"
                  name="jenis"
                  v-model="form.jenis"
                  required
                  :disabled="isLocked"
                  :class="
                    getError('peserta.jenis')
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                  "
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Pilih</option>
                  <option value="kb">KB</option>
                  <option value="tk">TK</option>
                </select>
              </div>

              <!-- program -->
              <div>
                <label
                  for="program"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Program <span class="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  required
                  v-model="form.program"
                  :disabled="isLocked"
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Pilih</option>
                  <option value="reguler">Reguler</option>
                  <option value="halfday">Half Day</option>
                  <option value="fullday">Full Day</option>
                </select>
              </div>
            </div>
          </div>

          <!-- section 1 peserta -->
          <div class="">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <User /> Data Peserta Didik
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div class="space-y-3">
                <!-- nama lengkap -->
                <div>
                  <label
                    for="nama_lengkap"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="nama_lengkap"
                    name="nama_lengkap"
                    v-model="form.peserta.nama_lengkap"
                    :readonly="isLocked"
                    type="text"
                    required
                    placeholder="Nama sesuai akta kelahiran"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.nama_lengkap')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.nama_lengkap')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.nama_lengkap") }}
                  </p>
                </div>

                <!-- nama panggilan -->
                <div>
                  <label
                    for="nama_panggilan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nama Panggilan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="nama_panggilan"
                    name="nama_panggilan"
                    v-model="form.peserta.nama_panggilan"
                    :readonly="isLocked"
                    type="text"
                    required
                    :class="
                      getError('peserta.nama_panggilan')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.nama_panggilan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.nama_panggilan") }}
                  </p>
                </div>

                <!-- tempat lahir -->
                <div>
                  <label
                    for="tempat_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tempat Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="tempat_lahir"
                    name="tempat_lahir"
                    v-model="form.peserta.tempat_lahir"
                    :readonly="isLocked"
                    type="text"
                    required
                    :class="
                      getError('peserta.tempat_lahir')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.tempat_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.tempat_lahir") }}
                  </p>
                </div>

                <!-- tanggal lahir -->
                <div>
                  <label
                    for="tanggal_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tanggal Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    v-model="form.peserta.tanggal_lahir"
                    :readonly="isLocked"
                    type="date"
                    required
                    :class="
                      getError('peserta.tanggal_lahir')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.tanggal_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.tanggal_lahir") }}
                  </p>
                </div>

                <!-- jenis kelamin -->
                <div>
                  <label
                    for="jenis_kelamin"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Jenis Kelamin <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    v-model="form.peserta.jenis_kelamin"
                    :disabled="isLocked"
                    required
                    :class="
                      getError('peserta.jenis_kelamin')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  >
                    <option value="">Pilih</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>

                  <p
                    v-if="getError('peserta.jenis_kelamin')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.jenis_kelamin") }}
                  </p>
                </div>

                <!-- kewarganegaraan -->
                <div>
                  <label
                    for="kewarganegaraan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kewarganegaraan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kewarganegaraan"
                    name="kewarganegaraan"
                    v-model="form.peserta.kewarganegaraan"
                    :readonly="isLocked"
                    type="text"
                    required
                    :class="
                      getError('peserta.kewarganegaraan')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.kewarganegaraan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.kewarganegaraan") }}
                  </p>
                </div>

                <!-- nik -->
                <div>
                  <label
                    for="nik"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    NIK <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="nik"
                    name="nik"
                    v-model="form.peserta.nik"
                    :readonly="isLocked"
                    placeholder="Lihat di KK"
                    type="text"
                    inputmode="numeric"
                    required
                    :class="
                      getError('peserta.nik')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.nik')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.nik") }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <!-- no kk -->
                <div>
                  <label
                    for="no_kk"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    No. KK <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="no_kk"
                    name="no_kk"
                    v-model="form.peserta.no_kk"
                    :readonly="isLocked"
                    type="text"
                    inputmode="numeric"
                    required
                    :class="
                      getError('peserta.no_kk')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.no_kk')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.no_kk") }}
                  </p>
                </div>

                <!-- ao akta -->
                <div>
                  <label
                    for="no_akta"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    No. Akta <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="no_akta"
                    name="no_akta"
                    v-model="form.peserta.no_akta"
                    :readonly="isLocked"
                    type="text"
                    required
                    :class="
                      getError('peserta.no_akta')
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    "
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                  />

                  <p
                    v-if="getError('peserta.no_akta')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.no_akta") }}
                  </p>
                </div>

                <!-- agama -->
                <div>
                  <label
                    for="agama"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Agama <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="agama"
                    name="agama"
                    required
                    v-model="form.peserta.agama"
                    :disabled="isLocked"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.agama')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  >
                    <option value="">Pilih Agama</option>
                    <option value="islam">Islam</option>
                    <option value="kristen">Kristen</option>
                    <option value="katolik">Katolik</option>
                    <option value="hindu">Hindu</option>
                    <option value="buddha">Buddha</option>
                    <option value="konghucu">Konghucu</option>
                  </select>

                  <p
                    v-if="getError('peserta.agama')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.agama") }}
                  </p>
                </div>

                <!-- no telp -->
                <div>
                  <label
                    for="no_telp"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    No. Telepon <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="no_telp"
                    name="no_telp"
                    v-model="form.peserta.no_telp"
                    :readonly="isLocked"
                    type="text"
                    inputmode="numeric"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.no_telp')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.no_telp')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.no_telp") }}
                  </p>
                </div>

                <!-- anak ke- -->
                <div>
                  <label
                    for="anak_ke"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Anak Ke- <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="anak_ke"
                    name="anak_ke"
                    v-model="form.peserta.anak_ke"
                    :readonly="isLocked"
                    placeholder="Berdasarkan KK"
                    type="number"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.anak_ke')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.anak_ke')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.anak_ke") }}
                  </p>
                </div>

                <!-- jumlah saudara kandung - -->
                <div>
                  <label
                    for="jumlah_saudara"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Jumlah Saudara <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="jumlah_saudara"
                    name="jumlah_saudara"
                    v-model="form.peserta.jumlah_saudara"
                    :readonly="isLocked"
                    placeholder="Tidak termasuk anak ysb"
                    type="number"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.jumlah_saudara')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.jumlah_saudara')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.jumlah_saudara") }}
                  </p>
                </div>

                <!-- bahasa - -->
                <div>
                  <label
                    for="bahasa"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Bahasa Sehari-hari <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="bahasa"
                    name="bahasa"
                    v-model="form.peserta.bahasa"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.bahasa')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.bahasa')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.bahasa") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- section 2 alamat domisili -->
          <div class="">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <MapPinCheck /> Alamat Domisili
            </h3>
            <!-- alamat lengkap -->
            <div class="mb-4">
              <label
                for="alamat_lengkap"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Alamat Lengkap <span class="text-red-500">*</span>
              </label>

              <input
                id="alamat_lengkap"
                name="alamat_lengkap"
                v-model="form.peserta.alamat_domisili.alamat_lengkap"
                :readonly="isLocked"
                type="text"
                required
                class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                :class="
                  getError('peserta.alamat_domisili.alamat_lengkap')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                "
              />

              <p
                v-if="getError('peserta.alamat_domisili.alamat_lengkap')"
                class="mt-1 text-xs text-red-500"
              >
                {{ getError("peserta.alamat_domisili.alamat_lengkap") }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div class="space-y-3">
                <!-- rt -->
                <div>
                  <label
                    for="rt"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    RT <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="rt"
                    name="rt"
                    v-model="form.peserta.alamat_domisili.rt"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.rt')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.rt')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.rt") }}
                  </p>
                </div>

                <!-- rw -->
                <div>
                  <label
                    for="rw"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    RW <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="rw"
                    name="rw"
                    v-model="form.peserta.alamat_domisili.rw"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.rw')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.rw')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.rw") }}
                  </p>
                </div>

                <!-- desa/kelurahan -->
                <div>
                  <label
                    for="kelurahan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Desa/Kelurahan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kelurahan"
                    name="kelurahan"
                    v-model="form.peserta.alamat_domisili.kelurahan"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.kelurahan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.kelurahan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.kelurahan") }}
                  </p>
                </div>
              </div>

              <!-- kanan -->
              <div class="space-y-3">
                <!-- kecamatan -->
                <div>
                  <label
                    for="kecamatan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kecamatan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kecamatan"
                    name="kecamatan"
                    v-model="form.peserta.alamat_domisili.kecamatan"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.kecamatan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.kecamatan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.kecamatan") }}
                  </p>
                </div>

                <!-- kabupaten -->
                <div>
                  <label
                    for="kabupaten"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kabupaten <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kabupaten"
                    name="kabupaten"
                    v-model="form.peserta.alamat_domisili.kabupaten"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.kabupaten')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.kabupaten')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.kabupaten") }}
                  </p>
                </div>

                <!-- kode pos -->
                <div>
                  <label
                    for="kode_pos"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kode Pos <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kode_pos"
                    name="kode_pos"
                    v-model="form.peserta.alamat_domisili.kode_pos"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_domisili.kode_pos')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_domisili.kode_pos')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_domisili.kode_pos") }}
                  </p>
                </div>
              </div>
            </div>

            <label class="checkbox-label" style="margin-top: 12px">
              <input
                type="checkbox"
                v-model="samaDenganKK"
                :disabled="isLocked"
                @change="copyAlamatKK"
              />
              Alamat KK sama dengan domisili
            </label>
          </div>

          <!-- section 3 alamat  -->
          <div class="mt-8" v-if="!samaDenganKK">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <MapPin /> Alamat
            </h3>
            <!-- alamat lengkap -->
            <div class="mb-4">
              <label
                for="alamat_lengkap"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Alamat Lengkap <span class="text-red-500">*</span>
              </label>

              <input
                id="alamat_lengkap"
                name="alamat_lengkap"
                v-model="form.peserta.alamat_kk.alamat_lengkap"
                :readonly="isLocked"
                type="text"
                required
                class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                :class="
                  getError('peserta.alamat_kk.alamat_lengkap')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                "
              />

              <p
                v-if="getError('peserta.alamat_kk.alamat_lengkap')"
                class="mt-1 text-xs text-red-500"
              >
                {{ getError("peserta.alamat_kk.alamat_lengkap") }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div class="space-y-3">
                <!-- rt -->
                <div>
                  <label
                    for="rt"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    RT <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="rt"
                    name="rt"
                    v-model="form.peserta.alamat_kk.rt"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.rt')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.rt')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.rt") }}
                  </p>
                </div>

                <!-- rw -->
                <div>
                  <label
                    for="rw"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    RW <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="rw"
                    name="rw"
                    v-model="form.peserta.alamat_kk.rw"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.rw')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.rw')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.rw") }}
                  </p>
                </div>

                <!-- desa/kelurahan -->
                <div>
                  <label
                    for="kelurahan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Desa/Kelurahan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kelurahan"
                    name="kelurahan"
                    v-model="form.peserta.alamat_kk.kelurahan"
                    :readonly="isLocked"
                    type="text"
                    required
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.kelurahan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.kelurahan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.kelurahan") }}
                  </p>
                </div>
              </div>

              <!-- kanan -->
              <div class="space-y-3">
                <!-- kecamatan -->
                <div>
                  <label
                    for="kecamatan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kecamatan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kecamatan"
                    name="kecamatan"
                    v-model="form.peserta.alamat_kk.kecamatan"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.kecamatan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.kecamatan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.kecamatan") }}
                  </p>
                </div>

                <!-- kabupaten -->
                <div>
                  <label
                    for="kabupaten"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kabupaten <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kabupaten"
                    name="kabupaten"
                    v-model="form.peserta.alamat_kk.kabupaten"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.kabupaten')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.kabupaten')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.kabupaten") }}
                  </p>
                </div>

                <!-- kode pos -->
                <div>
                  <label
                    for="kode_pos"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kode Pos <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="kode_pos"
                    name="kode_pos"
                    v-model="form.peserta.alamat_kk.kode_pos"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.alamat_kk.kode_pos')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                    "
                  />

                  <p
                    v-if="getError('peserta.alamat_kk.kode_pos')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.alamat_kk.kode_pos") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- section 4 kesehatan -->
          <div class="mt-8">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <Hospital /> Data Kesehatan Anak
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- berat badan -->
              <div>
                <label
                  for="berat_badan"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Berat Badan (kg) <span class="text-red-500">*</span>
                </label>

                <input
                  id="berat_badan"
                  name="berat_badan"
                  v-model="form.peserta.kesehatan.berat_badan"
                  :readonly="isLocked"
                  required
                  type="number"
                  placeholder="kg"
                  class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.berat_badan')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                />

                <p
                  v-if="getError('peserta.kesehatan.berat_badan')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.berat_badan") }}
                </p>
              </div>

              <!-- tinggi badan -->
              <div>
                <label
                  for="tinggi_badan"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Tinggi Badan (cm) <span class="text-red-500">*</span>
                </label>

                <input
                  id="tinggi_badan"
                  name="tinggi_badan"
                  v-model="form.peserta.kesehatan.tinggi_badan"
                  :readonly="isLocked"
                  required
                  type="number"
                  placeholder="cm"
                  class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.tinggi_badan')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                />

                <p
                  v-if="getError('peserta.kesehatan.tinggi_badan')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.tinggi_badan") }}
                </p>
              </div>

              <!-- lingkar kepala -->
              <div>
                <label
                  for="lingkar_kepala"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Lingkar Kepala (cm) <span class="text-red-500">*</span>
                </label>

                <input
                  id="lingkar_kepala"
                  name="lingkar_kepala"
                  v-model="form.peserta.kesehatan.lingkar_kepala"
                  :readonly="isLocked"
                  required
                  type="number"
                  placeholder="cm"
                  class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.lingkar_kepala')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                />

                <p
                  v-if="getError('peserta.kesehatan.lingkar_kepala')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.lingkar_kepala") }}
                </p>
              </div>

              <!-- golongan darah -->
              <div>
                <label
                  for="golongan_darah"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Golongan Darah <span class="text-red-500">*</span>
                </label>

                <select
                  id="golongan_darah"
                  name="golongan_darah"
                  v-model="form.peserta.kesehatan.golongan_darah"
                  :disabled="isLocked"
                  class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.golongan_darah')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                >
                  <option value="">-</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>

                <p
                  v-if="getError('peserta.kesehatan.golongan_darah')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.golongan_darah") }}
                </p>
              </div>

              <!-- Riwayat Penyakit -->
              <div class="md:col-span-2">
                <label
                  for="riwayat_penyakit"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Riwayat Penyakit <span class="text-red-500">*</span>
                </label>

                <input
                  id="riwayat_penyakit"
                  name="riwayat_penyakit"
                  v-model="form.peserta.kesehatan.riwayat_penyakit"
                  :readonly="isLocked"
                  type="text"
                  placeholder="Tuliskan jika ada"
                  class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.riwayat_penyakit')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                />

                <p
                  v-if="getError('peserta.kesehatan.riwayat_penyakit')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.riwayat_penyakit") }}
                </p>
              </div>

              <!-- Alergi -->
              <div>
                <label
                  for="alergi"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Alergi (makanan, obat, dll)
                  <span class="text-red-500">*</span>
                </label>

                <input
                  id="alergi"
                  name="alergi"
                  v-model="form.peserta.kesehatan.alergi"
                  :readonly="isLocked"
                  type="text"
                  placeholder="Tuliskan jika ada"
                  class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.alergi')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                />

                <p
                  v-if="getError('peserta.kesehatan.alergi')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.alergi") }}
                </p>
              </div>

              <!-- Kebutuhan Khusus -->
              <div class="md:col-span-2">
                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                  Kebutuhan Khusus <span class="text-red-500">*</span>
                </label>

                <div class="flex flex-wrap gap-4 mt-3">
                  <div
                    v-for="item in kebutuhanOptions"
                    :key="item"
                    class="flex items-center gap-2"
                  >
                    <input
                      :id="item"
                      type="checkbox"
                      :value="item"
                      v-model="form.peserta.kesehatan.kebutuhan_khusus"
                      class="h-4 w-4"
                      :disabled="isLocked"
                    />

                    <label
                      :for="item"
                      class="text-sm text-gray-700 capitalize cursor-pointer"
                    >
                      {{ item }}
                    </label>
                  </div>
                </div>

                <!-- input custom -->
                <input
                  v-if="
                    form.peserta.kesehatan.kebutuhan_khusus.includes('lainnya')
                  "
                  v-model="form.peserta.kesehatan.kebutuhan_khusus_lain"
                  type="text"
                  placeholder="Sebutkan lainnya"
                  class="mt-3 h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                  :class="
                    getError('peserta.kesehatan.kebutuhan_khusus_lain')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                  "
                  :disabled="isLocked"
                />

                <p class="mt-3 text-sm text-gray-500">
                  (Jika dalam 2 bulan pembelajaran ananda terdeteksi
                  berkebutuhan khusus maka pihak sekolah akan merekomendasikan
                  walimurid untuk berkonsultasi dengan dokter Spesialis Tumbuh
                  Kembang Anak. Kelanjutan pembelajaran di sekolah ditentukan
                  hasil asesmen Dokter Tumbuh Kembang Anak)
                </p>

                <p
                  v-if="getError('peserta.kesehatan.kebutuhan_khusus')"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError("peserta.kesehatan.kebutuhan_khusus") }}
                </p>
              </div>
            </div>
          </div>

          <!-- section 5 wali murid -->
          <div class="mt-8">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <Users /> Data Orang Tua / Wali Murid
            </h3>

            <h4 class="text-sm font-semibold mb-2">Ayah</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div class="space-y-3">
                <!-- nama -->
                <div>
                  <label
                    for="ayah_nama"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_nama"
                    name="ayah_nama"
                    v-model="form.peserta.orang_tua[0].nama"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.nama')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.nama')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.nama") }}
                  </p>
                </div>

                <!-- tempat lahir -->
                <div>
                  <label
                    for="ayah_tempat_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tempat Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_tempat_lahir"
                    name="ayah_tempat_lahir"
                    v-model="form.peserta.orang_tua[0].tempat_lahir"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.tempat_lahir')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.tempat_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.tempat_lahir") }}
                  </p>
                </div>

                <!-- tanggal lahir -->
                <div>
                  <label
                    for="ayah_tanggal_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tanggal Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_tanggal_lahir"
                    name="ayah_tanggal_lahir"
                    v-model="form.peserta.orang_tua[0].tanggal_lahir"
                    :readonly="isLocked"
                    required
                    type="date"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.tanggal_lahir')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.tanggal_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.tanggal_lahir") }}
                  </p>
                </div>

                <!-- nik -->
                <div>
                  <label
                    for="ayah_nik"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    NIK <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_nik"
                    name="ayah_nik"
                    v-model="form.peserta.orang_tua[0].nik"
                    :readonly="isLocked"
                    required
                    type="text"
                    inputmode="numeric"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.nik')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.nik')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.nik") }}
                  </p>
                </div>

                <!-- pendidikan -->
                <div>
                  <label
                    for="ayah_pendidikan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pendidikan <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="ayah_pendidikan"
                    name="ayah_pendidikan"
                    v-model="form.peserta.orang_tua[0].pendidikan"
                    :disabled="isLocked"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.pendidikan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  >
                    <option value="">Pilih</option>
                    <option>SD</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>D3</option>
                    <option>S1</option>
                    <option>S2</option>
                    <option>S3</option>
                  </select>

                  <p
                    v-if="getError('peserta.orang_tua.0.pendidikan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.pendidikan") }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <!-- pekerjaan -->
                <div>
                  <label
                    for="ayah_pekerjaan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pekerjaan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_pekerjaan"
                    name="ayah_pekerjaan"
                    v-model="form.peserta.orang_tua[0].pekerjaan"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.pekerjaan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.pekerjaan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.pekerjaan") }}
                  </p>
                </div>

                <!-- pendapatan -->
                <div>
                  <label
                    for="ayah_pendapatan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pendapatan / Bulan (Rp) <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_pendapatan"
                    name="ayah_pendapatan"
                    v-model="form.peserta.orang_tua[0].pendapatan"
                    :readonly="isLocked"
                    required
                    type="number"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.pendapatan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.pendapatan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.pendapatan") }}
                  </p>
                </div>

                <!-- no hp -->
                <div>
                  <label
                    for="ayah_no_hp"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    No. HP <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_no_hp"
                    name="ayah_no_hp"
                    v-model="form.peserta.orang_tua[0].no_hp"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.no_hp')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.no_hp')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.no_hp") }}
                  </p>
                </div>

                <!-- email -->
                <div>
                  <label
                    for="ayah_email"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_email"
                    name="ayah_email"
                    v-model="form.peserta.orang_tua[0].email"
                    :readonly="isLocked"
                    required
                    type="email"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.email')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.email')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.email") }}
                  </p>
                </div>

                <!-- alamat kantor -->
                <div>
                  <label
                    for="ayah_alamat_kantor"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Alamat Kantor <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ayah_alamat_kantor"
                    name="ayah_alamat_kantor"
                    v-model="form.peserta.orang_tua[0].alamat_kantor"
                    :readonly="isLocked"
                    required
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.0.alamat_kantor')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.0.alamat_kantor')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.0.alamat_kantor") }}
                  </p>
                </div>
              </div>
            </div>

            <h4 class="text-sm font-semibold mb-2">Ibu</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <!-- kiri -->
              <div class="space-y-3">
                <!-- nama -->
                <div>
                  <label
                    for="ibu_nama"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_nama"
                    name="ibu_nama"
                    v-model="form.peserta.orang_tua[1].nama"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.nama')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.nama')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.nama") }}
                  </p>
                </div>

                <!-- tempat lahir -->
                <div>
                  <label
                    for="ibu_tempat_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tempat Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_tempat_lahir"
                    name="ibu_tempat_lahir"
                    v-model="form.peserta.orang_tua[1].tempat_lahir"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.tempat_lahir')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.tempat_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.tempat_lahir") }}
                  </p>
                </div>

                <!-- tanggal lahir -->
                <div>
                  <label
                    for="ibu_tanggal_lahir"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tanggal Lahir <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_tanggal_lahir"
                    name="ibu_tanggal_lahir"
                    v-model="form.peserta.orang_tua[1].tanggal_lahir"
                    :readonly="isLocked"
                    type="date"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.tanggal_lahir')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.tanggal_lahir')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.tanggal_lahir") }}
                  </p>
                </div>

                <!-- nik -->
                <div>
                  <label
                    for="ibu_nik"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    NIK <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_nik"
                    name="ibu_nik"
                    v-model="form.peserta.orang_tua[1].nik"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.nik')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.nik')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.nik") }}
                  </p>
                </div>

                <!-- pendidikan -->
                <div>
                  <label
                    for="ibu_pendidikan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pendidikan <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="ibu_pendidikan"
                    name="ibu_pendidikan"
                    v-model="form.peserta.orang_tua[1].pendidikan"
                    :disabled="isLocked"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.pendidikan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  >
                    <option value="">Pilih</option>
                    <option>SD</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>D3</option>
                    <option>S1</option>
                    <option>S2</option>
                    <option>S3</option>
                  </select>

                  <p
                    v-if="getError('peserta.orang_tua.1.pendidikan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.pendidikan") }}
                  </p>
                </div>
              </div>

              <!-- kanan -->
              <div class="space-y-3">
                <!-- pekerjaan -->
                <div>
                  <label
                    for="ibu_pekerjaan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pekerjaan <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_pekerjaan"
                    name="ibu_pekerjaan"
                    v-model="form.peserta.orang_tua[1].pekerjaan"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.pekerjaan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.pekerjaan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.pekerjaan") }}
                  </p>
                </div>

                <!-- pendapatan -->
                <div>
                  <label
                    for="ibu_pendapatan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pendapatan / Bulan (Rp) <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_pendapatan"
                    name="ibu_pendapatan"
                    v-model="form.peserta.orang_tua[1].pendapatan"
                    :readonly="isLocked"
                    type="number"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.pendapatan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.pendapatan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.pendapatan") }}
                  </p>
                </div>

                <!-- no hp -->
                <div>
                  <label
                    for="ibu_no_hp"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    No. HP <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_no_hp"
                    name="ibu_no_hp"
                    v-model="form.peserta.orang_tua[1].no_hp"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.no_hp')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.no_hp')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.no_hp") }}
                  </p>
                </div>

                <!-- email -->
                <div>
                  <label
                    for="ibu_email"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_email"
                    name="ibu_email"
                    v-model="form.peserta.orang_tua[1].email"
                    :readonly="isLocked"
                    type="email"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.email')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.email')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.email") }}
                  </p>
                </div>

                <!-- alamat kantor -->
                <div>
                  <label
                    for="ibu_alamat_kantor"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Alamat Kantor <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="ibu_alamat_kantor"
                    name="ibu_alamat_kantor"
                    v-model="form.peserta.orang_tua[1].alamat_kantor"
                    :readonly="isLocked"
                    type="text"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.orang_tua.1.alamat_kantor')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.orang_tua.1.alamat_kantor')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.orang_tua.1.alamat_kantor") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- section 6 informasi -->
          <div class="mt-8">
            <h3 class="text-sm font-semibold mb-4 flex items-center gap-2">
              <Info /> Informasi Lain-lain
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- kiri -->
              <div class="space-y-3">
                <!-- tinggal dengan -->
                <div>
                  <label
                    for="tinggal_dengan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Tinggal Bersama <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="tinggal_dengan"
                    name="tinggal_dengan"
                    v-model="form.peserta.informasi.tinggal_dengan"
                    :disabled="isLocked"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.informasi.tinggal_dengan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  >
                    <option value="">Pilih</option>
                    <option value="orang tua">Orang Tua</option>
                    <option value="wali">Wali</option>
                    <option value="asrama">Asrama</option>
                  </select>

                  <p
                    v-if="getError('peserta.informasi.tinggal_dengan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.informasi.tinggal_dengan") }}
                  </p>
                </div>

                <!-- kendaraan -->
                <div>
                  <label
                    for="kendaraan"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Kendaraan ke Sekolah <span class="text-red-500">*</span>
                  </label>

                  <select
                    id="kendaraan"
                    name="kendaraan"
                    v-model="form.peserta.informasi.kendaraan"
                    :disabled="isLocked"
                    class="h-9 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.informasi.kendaraan')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  >
                    <option value="">Pilih</option>
                    <option value="jalan kaki">Jalan Kaki</option>
                    <option value="sepeda">Sepeda</option>
                    <option value="sepeda motor">Sepeda Motor</option>
                    <option value="mobil">Mobil</option>
                    <option value="angkutan umum">Angkutan Umum</option>
                  </select>

                  <p
                    v-if="getError('peserta.informasi.kendaraan')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.informasi.kendaraan") }}
                  </p>
                </div>

                <!-- jarak -->
                <div>
                  <label
                    for="jarak_sekolah"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Jarak ke Sekolah (km) <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="jarak_sekolah"
                    name="jarak_sekolah"
                    type="number"
                    step="0.1"
                    v-model="form.peserta.informasi.jarak_sekolah"
                    :readonly="isLocked"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.informasi.jarak_sekolah')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.informasi.jarak_sekolah')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.informasi.jarak_sekolah") }}
                  </p>
                </div>

                <!-- waktu -->
                <div>
                  <label
                    for="waktu_tempuh"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Waktu Tempuh <span class="text-red-500">*</span>
                  </label>

                  <input
                    id="waktu_tempuh"
                    name="waktu_tempuh"
                    type="text"
                    v-model="form.peserta.informasi.waktu_tempuh"
                    :readonly="isLocked"
                    class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                    :class="
                      getError('peserta.informasi.waktu_tempuh')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                    "
                  />

                  <p
                    v-if="getError('peserta.informasi.waktu_tempuh')"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ getError("peserta.informasi.waktu_tempuh") }}
                  </p>
                </div>

                <!-- checkbox -->
                <div class="flex items-center gap-2 pt-2">
                  <input
                    id="pernah_sekolah"
                    name="pernah_sekolah"
                    type="checkbox"
                    v-model="form.peserta.informasi.pernah_sekolah"
                    :disabled="isLocked"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label for="pernah_sekolah" class="text-sm text-gray-700">
                    Pernah bersekolah sebelumnya
                  </label>
                </div>

                <!-- kondisional -->
                <template v-if="form.peserta.informasi.pernah_sekolah">
                  <div>
                    <label
                      for="nama_sekolah"
                      class="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Nama Sekolah Sebelumnya
                      <span class="text-red-500">*</span>
                    </label>

                    <input
                      id="nama_sekolah"
                      v-model="form.peserta.informasi.nama_sekolah"
                      :readonly="isLocked"
                      type="text"
                      class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                      :class="
                        getError('peserta.informasi.nama_sekolah')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                      "
                    />

                    <p
                      v-if="getError('peserta.informasi.nama_sekolah')"
                      class="mt-1 text-xs text-red-500"
                    >
                      {{ getError("peserta.informasi.nama_sekolah") }}
                    </p>
                  </div>

                  <div>
                    <label
                      for="npsn"
                      class="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      NPSN Sekolah <span class="text-red-500">*</span>
                    </label>

                    <input
                      id="npsn"
                      v-model="form.peserta.informasi.npsn"
                      :readonly="isLocked"
                      type="text"
                      class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                      :class="
                        getError('peserta.informasi.npsn')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                      "
                    />

                    <p
                      v-if="getError('peserta.informasi.npsn')"
                      class="mt-1 text-xs text-red-500"
                    >
                      {{ getError("peserta.informasi.npsn") }}
                    </p>
                  </div>

                  <div>
                    <label
                      for="nisn"
                      class="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      NISN <span class="text-red-500">*</span>
                    </label>

                    <input
                      id="nisn"
                      v-model="form.peserta.informasi.nisn"
                      :readonly="isLocked"
                      type="text"
                      class="h-9 w-full rounded-lg border px-4 text-sm focus:outline-none focus:ring-2"
                      :class="
                        getError('peserta.informasi.nisn')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                      "
                    />

                    <p
                      v-if="getError('peserta.informasi.nisn')"
                      class="mt-1 text-xs text-red-500"
                    >
                      {{ getError("peserta.informasi.nisn") }}
                    </p>
                  </div>
                </template>
              </div>

              <!-- kanan -->
              <div class="space-y-3">
                <!-- bakat -->
                <div>
                  <label
                    for="bakat"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Bakat
                  </label>
                  <input
                    id="bakat"
                    name="bakat"
                    type="text"
                    v-model="form.peserta.informasi.bakat"
                    :readonly="isLocked"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <!-- hobi -->
                <div>
                  <label
                    for="hobi"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Hobi
                  </label>
                  <input
                    id="hobi"
                    name="hobi"
                    type="text"
                    v-model="form.peserta.informasi.hobi"
                    :readonly="isLocked"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <!-- Cita-cita -->
                <div>
                  <label
                    for="cita_cita"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Cita-cita
                  </label>
                  <input
                    id="cita_cita"
                    name="cita_cita"
                    type="text"
                    v-model="form.peserta.informasi.cita_cita"
                    :readonly="isLocked"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              type="submit"
              :disabled="isLocked || loading"
              class="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              :class="
                isLocked || loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              "
            >
              {{ loading ? "Menyimpan..." : "Simpan" }}
            </button>
          </div>
        </div>
      </form>

      <ConfirmModal
        :show="showConfirm"
        title="Konfirmasi"
        message="Data yang sudah disimpan tidak dapat diubah. Apakah anda yakin?"
        @confirm="doSubmit"
        @cancel="showConfirm = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { watch } from "vue";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { createPendaftaran } from "@/lib/services/pendaftaranService";
import { setPendaftaranId } from "@/lib/utils/storage";

import ConfirmModal from "@/components/common/ConfirmModal.vue";

import {
  School,
  User,
  MapPinCheck,
  MapPin,
  Hospital,
  Users,
  Info,
} from "lucide-vue-next";

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
});
const isLocked = computed(() => !!props.initialData);
const emit = defineEmits(["saved"]);
const samaDenganKK = ref(true);
const showConfirm = ref(false);
const payloadRef = ref(null);
const loading = ref(false);
const errors = ref({});
const getError = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], errors.value)?.[0];
};

const form = reactive({
  tahun_ajaran_id: 1,
  jenis: "",
  program: "",
  peserta: {
    nama_lengkap: "",
    nama_panggilan: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    kewarganegaraan: "",
    nik: "",
    no_kk: "",
    no_akta: "",
    agama: "",
    no_telp: "",
    anak_ke: null,
    jumlah_saudara: null,
    bahasa: "",
    alamat_domisili: {
      alamat_lengkap: "",
      rt: "",
      rw: "",
      kelurahan: "",
      kecamatan: "",
      kabupaten: "",
      kode_pos: "",
    },
    alamat_kk: {
      alamat_lengkap: "",
      rt: "",
      rw: "",
      kelurahan: "",
      kecamatan: "",
      kabupaten: "",
      kode_pos: "",
    },
    kesehatan: {
      berat_badan: null,
      tinggi_badan: null,
      lingkar_kepala: null,
      golongan_darah: "",
      riwayat_penyakit: "",
      alergi: "",
      kebutuhan_khusus: ["tidak ada"],
      kebutuhan_khusus_lain: "",
    },
    orang_tua: [
      {
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nik: "",
        pendidikan: "",
        pekerjaan: "",
        pendapatan: null,
        no_hp: "",
        email: "",
        alamat_kantor: "",
      },
      {
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nik: "",
        pendidikan: "",
        pekerjaan: "",
        pendapatan: null,
        no_hp: "",
        email: "",
        alamat_kantor: "",
      },
    ],
    informasi: {
      tinggal_dengan: "",
      kendaraan: "",
      jarak_sekolah: null,
      waktu_tempuh: "",
      pernah_sekolah: false,
      nama_sekolah: "",
      npsn: "",
      nisn: "",
      bakat: "",
      hobi: "",
      cita_cita: "",
    },
  },
});

const kebutuhanOptions = [
  "tidak ada",
  "speech delay",
  "adhd",
  "autis",
  "lainnya",
];

const normalizeKebutuhanKhusus = () => {
  const list = form.peserta.kesehatan.kebutuhan_khusus || [];
  const lainnyaText = form.peserta.kesehatan.kebutuhan_khusus_lain?.trim();

  let result = list.filter((i) => i !== "lainnya");

  if (list.includes("lainnya") && lainnyaText) {
    result.push(lainnyaText);
  }

  if (result.length === 0) {
    result = ["tidak ada"];
  }

  return result;
};

watch(
  () => form.peserta.alamat_domisili,
  (val) => {
    if (samaDenganKK.value) {
      form.peserta.alamat_kk = { ...val };
    }
  },
  { deep: true },
);

watch(
  () => form.peserta.kesehatan.kebutuhan_khusus,
  (val) => {
    const list = val || [];

    if (list.includes("tidak ada") && list.length > 1) {
      const last = list[list.length - 1];

      form.peserta.kesehatan.kebutuhan_khusus =
        last === "tidak ada" ? ["tidak ada"] : [last];

      return;
    }
  },
  { deep: true },
);

const copyAlamatKK = () => {
  if (samaDenganKK.value) {
    form.peserta.alamat_kk = { ...form.peserta.alamat_domisili };
  }
};

const mapKesehatan = (k) => {
  const { kebutuhan_khusus_lain, ...rest } = k;

  return {
    ...rest,
    kebutuhan_khusus: normalizeKebutuhanKhusus(),
  };
};

const simpanFormulir = () => {
  payloadRef.value = {
    tahun_ajaran_id: 1,
    jenis: form.jenis,
    program: form.program,

    peserta: {
      ...form.peserta,

      kesehatan: mapKesehatan(form.peserta.kesehatan),

      alamat_kk_same: samaDenganKK.value,

      alamat_kk: samaDenganKK.value ? null : form.peserta.alamat_kk,

      orang_tua: form.peserta.orang_tua.map((item, index) => ({
        ...item,
        tipe: index === 0 ? "ayah" : "ibu",
      })),
    },
  };

  showConfirm.value = true;
};

const doSubmit = async () => {
  if (!payloadRef.value) return;

  showConfirm.value = false;
  loading.value = true;

  try {
    const res = await createPendaftaran(payloadRef.value);

    const id = res.data.id;

    setPendaftaranId(id);

    showSuccess("Formulir berhasil disimpan");

    emit("saved", id);
  } catch (err) {
    console.log(err);

    if (err.errors) {
      errors.value = err.errors;
      showWarning("Periksa kembali form");
    } else {
      showError(err.message);
    }
  } finally {
    payloadRef.value = null;
    loading.value = false;
  }
};

watch(
  () => props.initialData,
  (data) => {
    if (!data) return;

    form.jenis = data.jenis;
    form.program = data.program;

    Object.assign(form.peserta, data.peserta);

    if (data.peserta?.orang_tua) {
      form.peserta.orang_tua = [
        data.peserta.orang_tua.find((o) => o.tipe === "ayah") || {},
        data.peserta.orang_tua.find((o) => o.tipe === "ibu") || {},
      ];
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
