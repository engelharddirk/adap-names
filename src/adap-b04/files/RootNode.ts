import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        if(to === this){
            throw new IllegalArgumentException("You have to move to a different directory");
        }
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        if(bn === ""){
            throw new IllegalArgumentException("Please provide a valid name");
        }
        // null operation
    }

}