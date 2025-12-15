type Props = {
  id?: number;
  startedAt: string | Date;
  endedAt: string | Date | null;
  status: boolean;
  userIp: string;
};

type RestoreProps = {
  id?: number;
  startedAt: string | Date;
  endedAt: string | Date | null;
  status: boolean;
  userIp: string;
};

export class GestureSessionDomainEntity {
  private _id?: number;
  private _startedAt: string | Date;
  private _endedAt: string | Date | null;
  private _status: boolean;
  private _userIp: string;

  constructor(props: Props) {
    this._id = props.id;
    this._startedAt = props.startedAt;
    this._endedAt = props.endedAt;
    this._status = props.status;
    this._userIp = props.userIp;
  }

  public static create(props: Props) {
    const gsession = new GestureSessionDomainEntity({
      ...props,
      startedAt: new Date(),
      endedAt: null,
    });
    return gsession;
  }

  public static restore(props: RestoreProps) {
    return new GestureSessionDomainEntity(props);
  }

  public get id() {
    return this._id;
  }

  public get startedAt() {
    return this._startedAt;
  }

  public set startedAt(value) {
    this._startedAt = value;
  }

  public get endedAt() {
    return this._endedAt;
  }

  public set endedAt(value) {
    this._endedAt = value;
  }

  public get status() {
    return this._status;
  }

  public set status(value) {
    this._status = value;
  }

  public get userIp() {
    return this._userIp;
  }

  public set userIp(value) {
    this._userIp = value;
  }

  public toJSON() {
    return {
      id: this.id,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      status: this.status,
      userIp: this.userIp,
    };
  }
}
