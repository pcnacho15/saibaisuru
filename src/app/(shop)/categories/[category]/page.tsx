interface Props {
  params: {
    category: string;
  };
}

export default function ({ params }: Props) {

    const { category } = params;

    return (
    <div>
      <h1>Bienvenido a la sección de { category }</h1>
    </div>
  );
}
