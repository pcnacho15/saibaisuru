interface Props {
  params: {
    category: string;
  };
}

export default async function ({ params }: Props) {

    const { category } = await params;

    return (
    <div>
      <h1>Bienvenido a la sección de { category }</h1>
    </div>
  );
}
