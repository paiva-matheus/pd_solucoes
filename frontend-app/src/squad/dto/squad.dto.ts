export type Squad = {
  id: number;
  name: string;
};

export class SquadDto {
  constructor(private remoteSquad: Squad) {}

  get id() {
    return this.remoteSquad.id;
  }

  get name() {
    return this.remoteSquad.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
