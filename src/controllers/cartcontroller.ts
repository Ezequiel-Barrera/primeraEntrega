import { Request, Response } from "express";
import { cartClass } from "../data/cartclass";

export class Cart {
    async getCart(req: Request, res: Response) {
        try {
            let cartGet: any = await cartClass.get()
            if (req.params.id !== undefined) {
                let cartFind: any = await cartClass.find(req.params.id);
                cartGet = cartGet[cartFind]
            } else {
                cartGet = await cartClass.get(req.params.id);
            }

            if (cartGet === undefined)
                return res.status(404).json("Error, el carrito esta vacio");
            res.status(200).json(cartGet);
        }
        catch (error) {
            res.status(404).json({ 
                "Error": error 
            })
        }

    }

    async addCart(req: Request, res: Response) {
        try {
            const body = cartClass.add(req.body);
            res.status(200).json({ 
                msg: "Felicitaciones!, Tu pedido se ingresado con exito", body 
            });
        }
        catch (error) {
            res.status(404).json({ 
                "Error": error 
            })
        };
    };

    async deleteCart(req: Request, res: Response) {
        try {
            let cartDel = await cartClass.delete(req.params.id)
            res.status(200).json({ 
                msg: "Se a eliminado tu pedido con exito", cartDel 
            })
        } catch (error) {
            res.status(404).json({ 
                "Error": error 
            })
        }
    };
}

export const cartController = new Cart();