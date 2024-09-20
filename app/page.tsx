import { Container, Title, TopBar, Filters, ProductCard } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard
                id={1}
                name={'Pizza'}
                price={15}
                imageUrl={
                  'https://media.dodostatic.net/image/r:233x233/11EF6B5C4F298D26AF9EDAE2CB73D872.avif'
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
