import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="mx-auto w-full max-w-[1000px] text-center">
        <p className="leading-7 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          necessitatibus commodi, voluptatibus placeat impedit illo inventore
          ullam accusantium. Quasi incidunt laboriosam repellat in illum
          mollitia id cum optio libero consectetur autem, qui eos. Voluptates
          architecto repudiandae numquam at, sint cupiditate recusandae vitae ad
          ducimus eum dignissimos eaque quae, quod excepturi!
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
