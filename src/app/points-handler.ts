export class PointsHandler{
    private _points: number;
    private readonly step:number;

    constructor(initialValue: number, step: number){
        this._points = initialValue;
        this.step = step;
    }

    addPoints(){
        this._points += this.step;
    }

    removePoints(){
        this._points -= this.step;
    }

    get points(): number {
        return this._points;
    }
}