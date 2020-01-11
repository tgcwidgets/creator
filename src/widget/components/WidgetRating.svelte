<script>
    import { game } from '../store';

    let filled = '★'.repeat($game.average_rating);
    let empty = '☆'.repeat(5 - $game.average_rating);
</script>

<div class="widget-rating">
    <span class="widget-rating__filled">{ filled }</span>
    <span class="widget-rating__empty">{ empty }</span>
</div>
