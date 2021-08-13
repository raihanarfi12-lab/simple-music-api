const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');


class SongsService {
  constructor() {
    this._songs = [];
  }
  addSong({title, year, performer, genre, duration}) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const insertedAt = createdAt;

    const newSong = {
      id, title, year, performer, genre, duration, insertedAt, updatedAt,
    };

    this._songs.push(newSong);
    const isSuccess = this._songs.filter((s)=>s.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }
  getSongs() {
    return this._songs;
  }
  getSongById(id) {
    const song = this._songs.filter((s) => s.id === id)[0];
    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return song;
  }
  editSongById(id, {title, year, performer, genre, duration}) {
    const index = this._songs.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }
  deleteSongById(id) {
    const index = this._songs.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}
module.exports = SongsService;
