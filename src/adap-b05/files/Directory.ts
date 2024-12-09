
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public findNodes(bn: string): Set<Node> {
        try {
            const result: Set<Node> = new Set<Node>();
            if (this.getBaseName() === bn) {
                result.add(this);
            }
            this.childNodes.forEach((node) => {
                const foundNodes = node.findNodes(bn);
                foundNodes.forEach((foundNode) => {
                    result.add(foundNode);
                });
            });
            this.assertClassInvariants();
            return result;
        } catch (e: any) {
            if (e instanceof ServiceFailureException) {
                throw e;
            }
        }
        return new Set<Node>();
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public getChildren(): Set<Node> {
        return this.childNodes;
    }

}