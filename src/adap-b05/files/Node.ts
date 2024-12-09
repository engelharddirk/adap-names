import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.remove(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
    }

    protected assertIsValidBaseName(bn: string): void {
        const condition: boolean = (bn != "");
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }


    public getBaseName(): string {
        console.log("baseName: " + this.baseName);
        let basename = this.baseName;
        let ret = this.doGetBaseName();
        console.log(basename + " " + ret + " "  + (basename === ret));
        if(basename !== ret){
            throw new MethodFailedException("Base name not equal to expected base name", new InvalidStateException("Base name not equal to expected base name"));
        }
        return ret;
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        if(bn == null){
            throw new MethodFailedException("Base name is null", new IllegalArgumentException("Base name is null"));
        }

        try {
            const result = new Set<Node>();
            if (this.getBaseName() === bn) {
                result.add(this);
            }
            this.assertClassInvariants();
            return result;
        } catch (e: any) {
            if (e instanceof ServiceFailureException) {
                throw e;
            }
        }
        return new Set<Node>();
    }

}
