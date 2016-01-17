$( function () {

    var $body = $( 'body' );
    var currentScroll = 0;
    var needsUpdate = true;

    $( '[data-up]' ).on( 'click touch', function ( event ) {
        event.stopPropagation();
        event.preventDefault();
        $( 'body' ).animate( { scrollTop: "0px" }, 2000 );
        return false;
    });
    
    var movables = [ makeMoveable( 'h1', -300 ),
                     makeMoveable( 'h2', -900 ),
                     makeMoveable( '.skills', -900 ) ];

    var shooglers = $( 'a' ).toArray().map( $ ).map( makeShoogler );

    // Moving things

    $( window ).scroll( function () {
        currentScroll = $body.scrollTop() / ( $body.height() - $( window ).height() );
        needsUpdate = true; 
    });

    (function render () {
        window.requestAnimationFrame( render );
        needsUpdate = false;
        movables.forEach( function ( fn ) { fn( currentScroll ); } );
    }());
    
});

function makeShoogler( $el ) {

    var shouldShoogle = false;
    var state = true;
    var lastUpdate = 0;
    (function loop () {
        window.requestAnimationFrame( loop );
        if ( shouldShoogle && Date.now() - lastUpdate > 60 ) {
            lastUpdate = Date.now();
            state = !state;
            $el.css( 'font-style', state ? 'italic' : 'normal' );
        }
    }());

    $el
        .on( 'mouseover', function () { shouldShoogle = true; })
        .on( 'mouseout', function () { shouldShoogle = false;
                               $el.css( 'font-style', 'normal' ); });
 
}

function makeMoveable( selector, targetPosition ) {
    var $el = $( selector );
    var originalPosition = parseInt( $el.css( 'top' ), 10 );
    return function ( scalar ) {
        $el.css( 'top', Math.floor( mapinterval( scalar, 0, 1, originalPosition, targetPosition ) ) + 'px' );
    };
}

function mapinterval ( input, inputMin, inputMax, outputMin, outputMax, clamp, ease ) {
    input = ( input - inputMin ) / ( inputMax - inputMin );
    if ( ease ) {
        input = ease(input);
    } 
    var output = input * ( outputMax - outputMin ) + outputMin;
    if ( !!clamp ) {
        if ( outputMax < outputMin ) {
            if ( output < outputMax ) {
                output = outputMax;
            }
            else if ( output > outputMin ) {
                output = outputMin;
            }
        } else {
            if ( output > outputMax ) {
                output = outputMax;
            }
            else if ( output < outputMin ) {
                output = outputMin;
            }
        }
    }
    return output;
}
