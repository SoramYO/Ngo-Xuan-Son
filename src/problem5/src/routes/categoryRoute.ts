import express from 'express'
import { Request, Response } from 'express';
const router = express.Router();
import { Category } from '../model/catetgory';

interface CategoryDTO {
    title: string;
    description: string;
}

router.get('/', async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json(categories);
});

router.post('/', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newCategory = new Category({
        title,
        description,
    });
   await  newCategory.save()
        .then((category : CategoryDTO) => res.status(201).json(category));
});

router.get('/:id', async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
    );
    if (updatedCategory) {
        res.json(updatedCategory);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
        res.json({ message: 'Category deleted successfully' });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});
export default router;