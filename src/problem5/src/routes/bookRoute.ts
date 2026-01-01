import express from 'express'
import { Request, Response } from 'express';
const router = express.Router();
import { Book } from '../model/book';

interface BookDTO {
    categoryId: string;
    name: string;
    publishedDate: Date;
    pages: number;
    author: string;
}

router.get('/', async (req: Request, res: Response) => {
    const { page = 1, limit = 10, name, publishedDate, author, categoryId } = req.query;
    const filter: any = {};

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;
    if (name) {
        filter.name = { $regex: new RegExp(name as string, 'i') };
    }
    if (publishedDate) {
        filter.publishedDate = new Date(publishedDate as string);
    }
    if (author) {
        filter.author = { $regex: new RegExp(author as string, 'i') };
    }
    if (categoryId) {
        filter.categoryId = categoryId;
    }

    const book = await Book.find(filter)
        .skip(skip)
        .limit(limitNumber);
    res.json(book);

});

router.post('/', async (req: Request, res: Response) => {
    const { categoryId, name, publishedDate, pages, author } = req.body;
    const newBook = new Book({
        categoryId,
        name,
        publishedDate,
        pages,
        author,
    });

    await newBook.save()
        .then((book: BookDTO) => res.status(201).json(book));
});

router.get('/:id', async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { categoryId, name, publishedDate, pages, author } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { categoryId, name, publishedDate, pages, author },
        { new: true }
    );
    if (updatedBook) {
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

export default router;