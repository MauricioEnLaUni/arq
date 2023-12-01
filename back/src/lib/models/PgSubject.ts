import { PrismaClient } from "@prisma/client";

import IObserver from "../Abstractions/IObserver.js";
import ISubject from "../Abstractions/ISubject.js";

class PgSubject implements ISubject
{
    private observers = new Map<Buffer, IObserver>();

    public calls: number = 0;

    private clients = new Set<PrismaClient>();

    get created(): number { return this.clients.size; }
    
    attach(observer: IObserver): void {
        if (this.observers.has(observer.hash())) return;

        this.observers.set(observer.hash(), observer);
    }
    dettach(observer: IObserver): void {
        if (!this.observers.has(observer.hash())) return;

        this.observers.delete(observer.hash());
    }
    notify(): void {
        for (const obs of this.observers)
        {
            obs[1].update(this);
        }
    }

    call(p: PrismaClient)
    {
        this.calls += 1;
        this.clients.add(p);

        this.notify();
    }
}

export default PgSubject;