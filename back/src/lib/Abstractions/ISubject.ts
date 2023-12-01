import IObserver from "./IObserver.js";

interface ISubject
{
    attach(observer: IObserver): void;
    dettach(observer: IObserver): void;

    notify(): void;
}

export default ISubject;