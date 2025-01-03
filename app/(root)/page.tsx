import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
  Stories,
} from '@/shared/components/shared';
import { findPizzas, GetSearchParams } from '@/shared/lib/findPizzas';
// import { Suspense } from 'react';

export default async function HomePage({ searchParams }: { searchParams: GetSearchParams }) {
  // prisma.category.findMany
  const categories = await findPizzas(searchParams);
  // const categories = [
  //   {
  //     id: 1,
  //     name: 'Пиццы', // 1
  //   },
  //   {
  //     id: 2,
  //     name: 'Завтраки', // 2
  //   },
  //   {
  //     id: 3,
  //     name: 'Закуски', // 3
  //   },
  //   {
  //     id: 4,
  //     name: 'Напитки', // 4
  //   },
  //   {
  //     id: 5,
  //     name: 'Коктейли', // 5
  //   },
  //   {
  //     id: 6,
  //     name: 'Кофе', // 6
  //   },
  //   {
  //     id: 7,
  //     name: 'Десерты', // 7
  //   },
  // ];
  // console.log(categories);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      {/* <TopBar categories={categories} /> */}
      <TopBar categories={categories.filter((category) => category.product.length > 0)} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* фильтрация */}
          <div className="w-[250px]">
            {/* <Suspense> */}
            <Filters />
            {/* </Suspense> */}
          </div>
          {/* список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  items={category.product}
                  categoryId={category.id}
                />
              ))}
              {/* <ProductsGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Pizza1',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6B5F4825323087AB73CD527FC965.avif',
                    price: 15,
                    items: [{ price: 15 }],
                  },
                ]}
                categoryId={1}
              /> */}
              {/* <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 1,
                    name: 'Pizza1',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6B5F4825323087AB73CD527FC965.avif',
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 2,
                    name: 'Pizza2',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6B5C4F298D26AF9EDAE2CB73D872.avif',
                    price: 13,
                    items: [{ price: 13 }],
                  },
                  {
                    id: 3,
                    name: 'Pizza3',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6E92875574239DE842FB185A5650.avif',
                    price: 12,
                    items: [{ price: 12 }],
                  },
                  {
                    id: 4,
                    name: 'Pizza4',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6E94946EFC2CBE3D38379894882E.avif',
                    price: 11,
                    items: [{ price: 11 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                ]}
                categoryId={2}
              />
              <ProductsGroupList
                title={'Закуски'}
                items={[
                  {
                    id: 1,
                    name: 'Pizza1',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6B5F4825323087AB73CD527FC965.avif',
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 2,
                    name: 'Pizza2',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6B5C4F298D26AF9EDAE2CB73D872.avif',
                    price: 13,
                    items: [{ price: 13 }],
                  },
                  {
                    id: 3,
                    name: 'Pizza3',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6E92875574239DE842FB185A5650.avif',
                    price: 12,
                    items: [{ price: 12 }],
                  },
                  {
                    id: 4,
                    name: 'Pizza4',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF6E94946EFC2CBE3D38379894882E.avif',
                    price: 11,
                    items: [{ price: 11 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                  {
                    id: 5,
                    name: 'Pizza5',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/11EF38570B8F74A3A71E200F82DCAEB8.avif',
                    price: 10,
                    items: [{ price: 10 }],
                  },
                ]}
                categoryId={3}
              /> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
