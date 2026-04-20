<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <!-- text -->
        <div>
          <h2 class="text-[16px] font-medium">Formulir Pendaftaran</h2>
          <p class="text-sm text-gray-500">
            Isi data peserta didik, data kesehatan, data orang tua, dan
            informasi tambahan dengan lengkap.
          </p>
        </div>
      </div>

      <!-- body -->
      <div class="p-6">
        <!-- program -->
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
                v-model="form.program"
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
            <!-- kiri -->
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
                  type="text"
                  placeholder="Nama sesuai akta kelahiran"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="date"
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                >
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  placeholder="Lihat di KK"
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
              </div>
            </div>

            <!-- kanan -->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  v-model="form.peserta.agama"
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                >
                  <option value="">Pilih Agama</option>
                  <option>Islam</option>
                  <option>Kristen</option>
                  <option>Katolik</option>
                  <option>Hindu</option>
                  <option>Budha</option>
                  <option>Konghucu</option>
                </select>
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  placeholder="Berdasarkan KK"
                  type="number"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  placeholder="Tidak termasuk anak ysb"
                  type="number"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
              type="text"
              placeholder=""
              class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <!-- kiri -->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
              </div>

              <!-- desa/kelurahan -->
              <div>
                <label
                  for="desa"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Desa/Kelurahan <span class="text-red-500">*</span>
                </label>
                <input
                  id="desa"
                  name="desa"
                  v-model="form.peserta.alamat_domisili.desa"
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
              </div>
            </div>
          </div>

          <label class="checkbox-label" style="margin-top: 12px">
            <input
              type="checkbox"
              v-model="samaDenganKK"
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
              type="text"
              placeholder=""
              class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <!-- kiri -->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
              </div>

              <!-- desa/kelurahan -->
              <div>
                <label
                  for="desa"
                  class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Desa/Kelurahan <span class="text-red-500">*</span>
                </label>
                <input
                  id="desa"
                  name="desa"
                  v-model="form.peserta.alamat_kk.desa"
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:outline-hidden focus:ring-brand-500/10"
                />
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
                type="number"
                placeholder="kg"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
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
                type="number"
                placeholder="cm"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
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
                type="number"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <!-- golongan darah -->
            <div>
              <label
                for="golongan_darah"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Golongan Darah
              </label>
              <select
                id="golongan_darah"
                name="golongan_darah"
                v-model="form.peserta.kesehatan.golongan_darah"
                class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">-</option>
                <option>A</option>
                <option>B</option>
                <option>AB</option>
                <option>O</option>
              </select>
            </div>

            <!-- Riwayat Penyakit -->
            <div class="md:col-span-2">
              <label
                for="riwayat_penyakit"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Riwayat Penyakit
              </label>
              <input
                id="riwayat_penyakit"
                name="riwayat_penyakit"
                v-model="form.peserta.kesehatan.riwayat_penyakit"
                type="text"
                placeholder="Tuliskan jika ada"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <!-- Alergi -->
            <div>
              <label
                for="alergi"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Alergi (makanan, obat, dll)
              </label>
              <input
                id="alergi"
                name="alergi"
                v-model="form.peserta.kesehatan.alergi"
                type="text"
                placeholder="Tuliskan jika ada"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <!-- Kebutuhan Khusus -->
            <div class="md:col-span-2">
              <label
                for="kebutuhan_khusus"
                class="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Kebutuhan Khusus
              </label>
              <input
                id="kebutuhan_khusus"
                name="kebutuhan_khusus"
                v-model="form.peserta.kesehatan.kebutuhan_khusus"
                type="text"
                placeholder="Tuliskan jika ada"
                class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
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
            <!-- kiri -->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="date"
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <!-- nik-->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
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
              </div>
            </div>

            <!-- kanan -->
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="number"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="email"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="date"
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="number"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="email"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  type="text"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="orang tua">Orang Tua</option>
                  <option value="wali">Wali</option>
                  <option value="asrama">Asrama</option>
                </select>
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="jalan kaki">Jalan Kaki</option>
                  <option value="sepeda">Sepeda</option>
                  <option value="sepeda motor">Sepeda Motor</option>
                  <option value="mobil">Mobil</option>
                  <option value="angkutan umum">Angkutan Umum</option>
                </select>
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  placeholder="cth: 5 menit"
                  v-model="form.peserta.informasi.waktu_tempuh"
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <!-- checkbox -->
              <div class="flex items-center gap-2 pt-2">
                <input
                  id="pernah_sekolah"
                  name="pernah_sekolah"
                  type="checkbox"
                  v-model="form.peserta.informasi.pernah_sekolah"
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
                    Nama Sekolah Sebelumnya <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="nama_sekolah"
                    name="nama_sekolah"
                    type="text"
                    v-model="form.peserta.informasi.nama_sekolah"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    for="npsn"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    NPSN Sekolah<span class="text-red-500">*</span>
                  </label>
                  <input
                    id="npsn"
                    name="npsn"
                    type="text"
                    v-model="form.peserta.informasi.npsn"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
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
                    name="nisn"
                    type="text"
                    v-model="form.peserta.informasi.nisn"
                    class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
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
                  class="h-9 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="simpanFormulir"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            Simpan
          </button>
        </div>
      </div>

      <div
        v-if="toast.show"
        :class="['alert', 'alert-' + toast.type]"
        style="
          position: fixed;
          bottom: 24px;
          right: 24px;
          max-width: 320px;
          z-index: 999;
          box-shadow: var(--shadow-md);
        "
      >
        {{ toast.msg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { watch } from "vue";
import { createPendaftaran } from "@/lib/services/pendaftaranService";

import {
  School,
  User,
  MapPinCheck,
  MapPin,
  Hospital,
  Users,
  Info,
} from "lucide-vue-next";

const emit = defineEmits(["saved"]);
const samaDenganKK = ref(true);
const toast = reactive({
  show: false,
  msg: "",
  type: "success",
});

const form = reactive({
  id_tahun: 1,
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
      desa: "",
      kecamatan: "",
      kabupaten: "",
      kode_pos: "",
    },
    alamat_kk: {
      alamat_lengkap: "",
      rt: "",
      rw: "",
      desa: "",
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
      kebutuhan_khusus: "",
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

watch(
  () => form.peserta.alamat_domisili,
  (val) => {
    if (samaDenganKK.value) {
      form.peserta.alamat_kk = { ...val };
    }
  },
  { deep: true },
);

const showToast = (msg, type = "success") => {
  toast.msg = msg;
  toast.type = type;
  toast.show = true;
  setTimeout(() => (toast.show = false), 3000);
};

const copyAlamatKK = () => {
  if (samaDenganKK.value) {
    form.peserta.alamat_kk = { ...form.peserta.alamat_domisili };
  }
};

const simpanFormulir = async () => {
  try {
    if (!form.peserta.nama_lengkap || !form.peserta.tanggal_lahir) {
      showToast("Nama dan tanggal lahir wajib diisi", "warning");
      return;
    }

    const payload = {
      id_tahun: 1,
      jenis: form.jenis,
      program: form.program,
      peserta: {
        ...form.peserta,

        orang_tua: form.peserta.orang_tua.map((item, index) => ({
          ...item,
          tipe: index === 0 ? "ayah" : "ibu",
          alamat:
            form.peserta.alamat_kk && form.peserta.alamat_kk.alamat_lengkap
              ? form.peserta.alamat_kk
              : form.peserta.alamat_domisili,
        })),
      },
    };

    await createPendaftaran(payload);

    showToast("Formulir berhasil disimpan");

    setTimeout(() => {
      emit("saved");
    }, 500);
  } catch (err) {
    console.log(err);

    if (err.errors) {
      showToast(Object.values(err.errors)[0][0], "warning");
    } else {
      showToast(err.message, "error");
    }
  }
};
</script>

<style lang="scss" scoped></style>
