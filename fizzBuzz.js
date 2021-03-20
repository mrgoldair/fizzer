
function fizzBuzz(n) {
  for (let index = 0; index < n; index++) {

    // In this pipeline since we can access n from anywhere
    // we don't need to pass it through

    // Int -> Bool
    // Int -> Tuple Int String
    if( n % 3 == 0 ){
      // return string but also the number for the next part of the pipeline
      // building up our result
      console.log( "Fizz" );
    }
    // return [ n,"Fizz" ] or [ n,"" ]

    // Int -> Tuple Int String
    else if ( n % 5 == 0 ){
      console.log( "Buzz" );
    } else {
      console.log( `${n}` );
    }
  }
}

function compose(f,g){
  return n => {
    return f(g(n));
  }
}

const isMultiple = n => m => n % m === 0

// Recycle

// Int -> Either Int String
const fizz = n => {
  if( n % 3 == 0 )
    return [ n,"Fizz" ]
  return [ n,"" ]
}

// forall a. a -> Writer s a
const tell = a => [ a,"" ]

// forall s. s -> Writer s a
const pure = s => [ 0,s ]

bind(tell("Buzz"), s => pure(3))

// Int -> Writer Int String
const buzz = n => {
  if( n % 5 == 0 )
    return [ n,"Buzz" ]
  return [ n,"" ]
}

const bind = f => m => {
  let [ a,fizz ] = m;
  let [ b,buzz ] = f(a)
  return [ b,fizz + buzz ]
}

const fizzBuzz = compose(bind(buzz),fizz)

function* range(n) {
  for (let index = 0; index < n; index++) {
    yield index;
  }
}

[...range(100)]
  .map( fizzBuzz )
  .map(([ r,msg ]) => {
    if( msg.length == 0 )
      console.log(r)
    console.log(msg)
  })