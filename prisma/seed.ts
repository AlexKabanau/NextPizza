import { hashSync } from 'bcrypt';
import { prisma } from './PrismaClient';
import { categories, _ingredients, products } from './constants';
import { Prisma } from '@prisma/client';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};
const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(19, 60),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@test.com',
        password: hashSync('111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@test.com',
        password: hashSync('333', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: _ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пицца из половинок',
      imageUrl: '/images/pizzasImages/11EE7D5F2F13041E9101158D09CEBAE0.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description: 'Два вкуса в одной пицце 35 см',
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Охотничья',
      imageUrl: '/images/pizzasImages/11EF16934D18C2059B66C44A4B7BDA7E.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description: 'Соус альфредо, много моцареллы, охотничьи колбаски и шампиньоны',
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Мясная с аджикой 🌶🌶',
      imageUrl: '/images/pizzasImages/11EF0234EAFD8424A3D86A21876DE68C.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description:
        'Баварские колбаски, острые колбаски чоризо, пикантная пепперони, цыпленок, моцарелла, фирменный томатный соус, острый соус аджика',
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Баварская',
      imageUrl: '/images/pizzasImages/11EEF45FDF8D3091A8826B43F4026BAB.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description:
        'Баварские колбаски, маринованные огурчики, красный лук, томаты, горчичный соус, моцарелла, фирменный томатный соус',
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Жюльен',
      imageUrl: '/images/pizzasImages/11EE7D5F1C0043C2985BBF6397E459ED.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Цыпленок, шампиньоны, ароматный грибной соус, красный лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо',
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'Карбонара',
      imageUrl: '/images/pizzasImages/11EEA58E169BBB7189B38C04883BB1BA.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description:
        'Бекон, сыры чеддер и пармезан, моцарелла, томаты, фирменный соус альфредо, красный лук, чеснок, итальянские травы',
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'Креветки со сладким чили',
      imageUrl: '/images/pizzasImages/11EF1EB0F2E525A6963C334B9EAF6848.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description:
        'Креветки, ананасы, соус сладкий чили, сладкий перец, моцарелла, фирменный соус альфредо',
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'Кантри-пицца',
      imageUrl: '/images/pizzasImages/11EEAAF6BCA45D9FAD523E13EE74F1C0.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description:
        'Бекон, ветчина, хрустящий лук, соус барбекю, соус ранч, моцарелла, маринованные огурчики, красный лук, сухой чеснок',
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: 'Чикен бомбони',
      imageUrl: '/images/pizzasImages/11EF1EB095B2BBDE8E1230BD91995D9D.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Куриные кусочки, сладкий перец, сыры чеддер и пармезан, моцарелла, красный лук, соус сладкий чили, фирменный соус альфредо',
    },
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: 'Аррива!',
      imageUrl: '/images/pizzasImages/11EEA58D1CDE4E0D8DD7BB17004C349D.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EEA58D1CDE4E0D8DD7BB17004C349D.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description:
        'Цыпленок, острые колбаски чоризо, соус бургер, сладкий перец, красный лук, томаты, моцарелла, соус ранч и сухой чеснок',
    },
  });

  const pizza11 = await prisma.product.create({
    data: {
      name: 'Ветчина и огурчики',
      imageUrl: '/images/pizzasImages/11EE7D5F023926BABE8370E126C19685.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description: 'Ветчина, маринованные огурчики, красный лук, соус ранч, моцарелла',
    },
  });

  const pizza12 = await prisma.product.create({
    data: {
      name: 'Сырная 🌱👶',
      imageUrl: '/images/pizzasImages/11EE7D5EC72C18AD947C4FCBCD336C28.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description: 'Увеличенная порция моцареллы, сыры чеддер и пармезан, фирменный соус альфредо',
    },
  });

  const pizza13 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш 🌶',
      imageUrl: '/images/pizzasImages/11EE7D5F06CB389898C7FF7B707F03A0.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description: 'Острые колбаски чоризо, зеленый перец, моцарелла, фирменный томатный соус',
    },
  });

  const pizza14 = await prisma.product.create({
    data: {
      name: 'Ветчина и сыр',
      imageUrl: '/images/pizzasImages/11EE7D5EE5C68FB89FD6FDAC7DDF92FB.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description: 'Ветчина, моцарелла, фирменный соус альфредо',
    },
  });

  const pizza15 = await prisma.product.create({
    data: {
      name: 'Итальянский цыпленок',
      imageUrl: '/images/pizzasImages/11EE7D5F19C441CF95B598F6E5E4C5FC.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description:
        'Цыпленок, итальянские травы, сыр моцарелла, красный лук, томаты свежие, фирменный соус альфредо',
    },
  });

  const pizza16 = await prisma.product.create({
    data: {
      name: 'Двойной цыпленок 👶',
      imageUrl: '/images/pizzasImages/11EE7D5EF5CC13A490103B92A7737459.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description: 'Цыпленок, моцарелла, фирменный соус альфредо',
    },
  });

  const pizza17 = await prisma.product.create({
    data: {
      name: 'Деревенская',
      imageUrl: '/images/pizzasImages/11EE7D5EEAB632F58FA9238A2CC13BBB.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Картофель из печи, маринованные огурчики, цыпленок, соус ранч, томаты, красный лук, чеснок, моцарелла, фирменный томатный соус',
    },
  });

  const pizza18 = await prisma.product.create({
    data: {
      name: 'Додо микс',
      imageUrl: '/images/pizzasImages/11EEE2451896B4FCBF26B348CCE5FE6B.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description: 'Четыре любимых пиццы в одной: Карбонара, Песто, Сырная, Ветчина и сыр',
    },
  });

  const pizza19 = await prisma.product.create({
    data: {
      name: 'Песто',
      imageUrl: '/images/pizzasImages/11EEAA3DCE1E36DB983445A578830144.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description: 'Соус песто, цыпленок, кубики брынзы, томаты, моцарелла, соус альфредо',
    },
  });

  const pizza20 = await prisma.product.create({
    data: {
      name: 'Мясная',
      imageUrl: '/images/pizzasImages/11EE7D5ED2D7730A8FD9EAABB7E6BCBE.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description:
        'Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус',
    },
  });

  const pizza21 = await prisma.product.create({
    data: {
      name: 'Бургер-пицца',
      imageUrl: '/images/pizzasImages/11EE7D5F0C8EA951B957406D02CA3C4D.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Ветчина, маринованные огурчики, томаты, красный лук, чеснок, соус бургер, моцарелла, фирменный томатный соус',
    },
  });

  const pizza22 = await prisma.product.create({
    data: {
      name: 'Домашняя',
      imageUrl: '/images/pizzasImages/11EE7D5EFF9662159465E4D4D2B813CE.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description:
        'Пикантная пепперони, ветчина, маринованные огурчики, томаты, моцарелла, фирменный томатный соус',
    },
  });

  const pizza23 = await prisma.product.create({
    data: {
      name: 'Додо',
      imageUrl: '/images/pizzasImages/11EEAA3D428F7D3BA4D099583F271097.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description:
        'Бекон, митболы из говядины, пикантная пепперони, моцарелла, томаты, шампиньоны, сладкий перец, красный лук, чеснок, фирменный томатный соус',
    },
  });

  const pizza24 = await prisma.product.create({
    data: {
      name: 'Пепперони',
      imageUrl: '/images/pizzasImages/11EE7D5ED4C9050D84B1932A18396C2E.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description: 'Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус',
    },
  });

  const pizza25 = await prisma.product.create({
    data: {
      name: 'Четыре сезона',
      imageUrl: '/images/pizzasImages/11EE7D5EDE8F665C89A9328216FE2126.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Томатный соус, пикантная пепперони, ветчина, кубики брынзы, томаты, шампиньоны, моцарелла, итальянские травы',
    },
  });

  const pizza26 = await prisma.product.create({
    data: {
      name: 'Гавайская с альфредо',
      imageUrl: '/images/pizzasImages/11EE7D5F1870A83586E2C6899863D80A.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description: 'Двойная порция цыпленка, ананасы, моцарелла, фирменный соус альфредо',
    },
  });

  const pizza27 = await prisma.product.create({
    data: {
      name: 'Ветчина и грибы',
      imageUrl: '/images/pizzasImages/11EF5B10E3FF74B5A374FE57FD333845.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description: 'Ветчина, много моцареллы, шампиньоны, фирменный томатный соус',
    },
  });

  const pizza28 = await prisma.product.create({
    data: {
      name: 'Сырный цыпленок',
      imageUrl: '/images/pizzasImages/11EE7D5EC38508228FE86B151F762DF0.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description:
        'Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок',
    },
  });

  const pizza29 = await prisma.product.create({
    data: {
      name: 'Цыпленок барбекю',
      imageUrl: '/images/pizzasImages/11EE7D5EC8FF89FDB4EB4C2FA1A066FE.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description: 'Цыпленок, бекон, соус барбекю, красный лук, моцарелла, томатный соус',
    },
  });

  const pizza30 = await prisma.product.create({
    data: {
      name: 'Цыпленок ранч',
      imageUrl: '/images/pizzasImages/11EE7D5ED9EE0A52BD709391420AE559.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description: 'Соус Ранч, цыпленок, ветчина, томаты, сухой чеснок, моцарелла',
    },
  });

  const pizza31 = await prisma.product.create({
    data: {
      name: 'Маргарита 🌱',
      imageUrl: '/images/pizzasImages/11EE7D5EDBB090A79F2FE1F49438FAE8.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
      description:
        'Увеличенная порция моцареллы, томаты, итальянские травы, фирменный томатный соус',
    },
  });

  const pizza32 = await prisma.product.create({
    data: {
      name: 'Овощи и грибы 🌱',
      imageUrl: '/images/pizzasImages/11EE7D5EE11701CB9907D0B38BBCFFAA.avif',
      // 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(15, 18),
      },
      description:
        'Шампиньоны, томаты, сладкий перец, маслины, красный лук, кубики брынзы, моцарелла, томатный соус, итальянские травы',
    },
  });

  const pizza33 = await prisma.product.create({
    data: {
      name: 'Мясной микс с баварскими колбасками',
      imageUrl: '/images/pizzasImages/11EEFF36F10F56B99194CC77FEADC910.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      description:
        'Баварские колбаски, острые колбаски чоризо, пикантная пепперони, бекон, моцарелла и фирменный томатный соус',
    },
  });

  const pizza34 = await prisma.product.create({
    data: {
      name: 'Двойная пепперони',
      imageUrl: '/images/pizzasImages/11EE7D5EC175F485B576380B51BF32FE.avif',
      // 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      description:
        'Двойная порция пикантной пепперони, увеличенная порция моцареллы, фирменный томатный соус',
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца из половинок
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Охотничья
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Мясная с аджикой 🌶🌶
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Баварская
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40 }),
      // Жюльен
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

      // Карбонара
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

      // Креветки со сладким чили
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

      // Кантри-пицца
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),
      // Чикен бомбони
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40 }),

      // Аррива!
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 40 }),

      // Ветчина и огурчики
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 40 }),

      // Сырная 🌱👶
      generateProductItem({ productId: pizza12.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 40 }),
      // Чоризо фреш 🌶
      generateProductItem({ productId: pizza13.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 2, size: 40 }),

      // Ветчина и сыр
      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 40 }),

      // Итальянский цыпленок
      generateProductItem({ productId: pizza15.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza15.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza15.id, pizzaType: 2, size: 40 }),

      // Двойной цыпленок 👶
      generateProductItem({ productId: pizza16.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza16.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza16.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza16.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza16.id, pizzaType: 2, size: 40 }),
      // Деревенская
      generateProductItem({ productId: pizza17.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza17.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza17.id, pizzaType: 2, size: 40 }),

      // Додо микс
      generateProductItem({ productId: pizza18.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza18.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza18.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza18.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza18.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza18.id, pizzaType: 2, size: 40 }),

      // Песто
      generateProductItem({ productId: pizza19.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza19.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza19.id, pizzaType: 2, size: 40 }),

      // Мясная
      generateProductItem({ productId: pizza20.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza20.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza20.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza20.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza20.id, pizzaType: 2, size: 40 }),
      // Бургер-пицца
      generateProductItem({ productId: pizza21.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza21.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza21.id, pizzaType: 2, size: 40 }),

      // Домашняя
      generateProductItem({ productId: pizza22.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza22.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza22.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza22.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza22.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza22.id, pizzaType: 2, size: 40 }),

      // Додо
      generateProductItem({ productId: pizza23.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza23.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza23.id, pizzaType: 2, size: 40 }),

      // Пепперони
      generateProductItem({ productId: pizza24.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza24.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza24.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza24.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza24.id, pizzaType: 2, size: 40 }),
      // Четыре сезона
      generateProductItem({ productId: pizza25.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza25.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza25.id, pizzaType: 2, size: 40 }),

      // Гавайская с альфредо
      generateProductItem({ productId: pizza26.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza26.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza26.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza26.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza26.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza26.id, pizzaType: 2, size: 40 }),

      // Ветчина и грибы
      generateProductItem({ productId: pizza27.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza27.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza27.id, pizzaType: 2, size: 40 }),

      // Сырный цыпленок
      generateProductItem({ productId: pizza28.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza28.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza28.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza28.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza28.id, pizzaType: 2, size: 40 }),
      // Цыпленок барбекю
      generateProductItem({ productId: pizza29.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza29.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza29.id, pizzaType: 2, size: 40 }),

      // Цыпленок ранч
      generateProductItem({ productId: pizza30.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza30.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza30.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza30.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza30.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza30.id, pizzaType: 2, size: 40 }),

      // Маргарита 🌱
      generateProductItem({ productId: pizza31.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza31.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza31.id, pizzaType: 2, size: 40 }),

      // Овощи и грибы 🌱
      generateProductItem({ productId: pizza32.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza32.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza32.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza32.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza32.id, pizzaType: 2, size: 40 }),
      // Мясной микс с баварскими колбасками
      generateProductItem({ productId: pizza33.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza33.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza33.id, pizzaType: 2, size: 40 }),

      // Двойная пепперони
      generateProductItem({ productId: pizza34.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza34.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza34.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza34.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza34.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza34.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
      generateProductItem({ productId: 19 }),
      generateProductItem({ productId: 20 }),
      generateProductItem({ productId: 21 }),
      generateProductItem({ productId: 22 }),
      generateProductItem({ productId: 23 }),
      generateProductItem({ productId: 24 }),
      generateProductItem({ productId: 25 }), //закуски 67
      generateProductItem({ productId: 26 }),
      generateProductItem({ productId: 27 }),
      generateProductItem({ productId: 28 }),
      generateProductItem({ productId: 29 }),
      generateProductItem({ productId: 30 }),
      generateProductItem({ productId: 31 }),
      generateProductItem({ productId: 32 }),
      generateProductItem({ productId: 33 }),
      generateProductItem({ productId: 34 }),
      generateProductItem({ productId: 35 }),
      generateProductItem({ productId: 36 }),
      generateProductItem({ productId: 37 }),
      generateProductItem({ productId: 38 }),
      generateProductItem({ productId: 39 }),
      generateProductItem({ productId: 40 }),
      generateProductItem({ productId: 41 }),
      generateProductItem({ productId: 42 }),
      generateProductItem({ productId: 43 }),
      generateProductItem({ productId: 44 }),
      generateProductItem({ productId: 45 }),
      generateProductItem({ productId: 46 }),
      generateProductItem({ productId: 47 }),
      generateProductItem({ productId: 48 }),
      generateProductItem({ productId: 49 }),
      generateProductItem({ productId: 50 }),
      generateProductItem({ productId: 51 }),
      generateProductItem({ productId: 52 }),
      generateProductItem({ productId: 53 }),
      generateProductItem({ productId: 54 }),
      generateProductItem({ productId: 55 }),
      generateProductItem({ productId: 56 }),
      generateProductItem({ productId: 57 }),
      generateProductItem({ productId: 58 }),
      generateProductItem({ productId: 59 }),
      generateProductItem({ productId: 60 }),
      generateProductItem({ productId: 61 }),
      generateProductItem({ productId: 62 }),
      generateProductItem({ productId: 63 }),
      generateProductItem({ productId: 64 }),
      generateProductItem({ productId: 65 }),
      generateProductItem({ productId: 66 }),
      generateProductItem({ productId: 67 }),
      generateProductItem({ productId: 68 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '123456',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '123321',
      },
    ],
  });
  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
