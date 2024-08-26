export type RemoteSquad = {
  id: number
  name: string;
};

export class SquadDto {
  constructor(private remoteSquad: RemoteSquad) {}

  get id() {
    return this.remoteSquad.id;
  }

  get name() {
    return this.remoteSquad.name;
  }
}
