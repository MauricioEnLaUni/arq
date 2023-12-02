import ISubject from "./ISubject.js";

interface IObserver
{
    update(data: ISubject): void;

    hash(): Buffer;
}

export default IObserver;
