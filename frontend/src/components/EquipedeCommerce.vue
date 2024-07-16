<template>
  <div class="content-container">
    <h1 class="text-center mb-4">Équipe Commerce - Tableaux des Données</h1>

    <b-tabs card class="custom-tab">
      <b-tab title="Metrics de vente des produits" active>
        <div class="table-container">
          <div class="form-group mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher par nom de produit"
              v-model="productSalesQuery"
            />
          </div>
          <b-table
            id="product-sales-table"
            striped
            outlined
            hover
            foot-clone
            table-variant="light"
            :items="sortedPaginatedProductSalesItems"
            :fields="productSalesFields"
            responsive="sm"
          >
            <template #cell(payment_value)="data">
              ${{ data.item.payment_value.toLocaleString() }}
            </template>
            <template #cell(avg_revenue)="data">
              ${{ data.item.avg_revenue.toLocaleString() }}
            </template>
            <template #cell(avg_review_score)="data">
              {{ data.item.avg_review_score.toFixed(2) }}
            </template>
          </b-table>
          <b-pagination
            v-if="totalPagesProductSales > 1"
            v-model="currentPageProductSales"
            :total-rows="totalItemsProductSales"
            :per-page="itemsPerPage"
            aria-controls="product-sales-table"
          ></b-pagination>
        </div>
      </b-tab>

      <b-tab title="Commande des villes et leur populations">
        <div class="table-container">
          <div class="form-group mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher par ville"
              v-model="cityOrdersQuery"
            />
          </div>
          <b-table
            id="city-orders-table"
            striped
            outlined
            hover
            foot-clone
            table-variant="light"
            :items="sortedPaginatedCityOrdersItems"
            :fields="cityOrdersFields"
            responsive="sm"
          ></b-table>
          <b-pagination
            v-if="totalPagesCityOrders > 1"
            v-model="currentPageCityOrders"
            :total-rows="totalItemsCityOrders"
            :per-page="itemsPerPage"
            aria-controls="city-orders-table"
          ></b-pagination>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productSalesItems: [],
      cityOrdersItems: [],

      productSalesQuery: '',
      cityOrdersQuery: '',

      currentPageProductSales: 1,
      currentPageCityOrders: 1,
      itemsPerPage: 10,

      productSalesFields: [
        { key: 'product_category_name_english', label: 'Nom du Produit' },
        { key: 'payment_value', label: 'Valeur du Paiement' },
        { key: 'total_products_sold', label: 'Produits Vendus' },
        { key: 'avg_revenue', label: 'Revenu Moyen' },
        { key: 'return_rate', label: 'Taux de Retour' },
        { key: 'avg_delivery_time', label: 'Temps de Livraison Moyen' },
        { key: 'avg_review_score', label: 'Note Moyenne' },
      ],

      cityOrdersFields: [
        { key: 'city', label: 'Ville' },
        { key: 'total_orders', label: 'Total des Commandes' },
        { key: 'population', label: 'Population' },
      ]
    };
  },
  computed: {
    filteredProductSalesItems() {
      return this.productSalesItems.filter(item =>
        item.product_category_name_english &&
        item.payment_value !== null &&
        item.total_products_sold !== null &&
        item.avg_revenue !== null &&
        item.return_rate !== null &&
        item.avg_delivery_time !== null &&
        item.avg_review_score !== null &&
        (!this.productSalesQuery || item.product_category_name_english.toLowerCase().includes(this.productSalesQuery.toLowerCase()))
      );
    },
    totalItemsProductSales() {
      return this.filteredProductSalesItems.length;
    },
    totalPagesProductSales() {
      return Math.ceil(this.totalItemsProductSales / this.itemsPerPage);
    },
    paginatedProductSalesItems() {
      const start = (this.currentPageProductSales - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProductSalesItems.slice(start, end);
    },
    sortedPaginatedProductSalesItems() {
      return this.getSortedItems(this.paginatedProductSalesItems, 'total_products_sold');
    },

    filteredCityOrdersItems() {
      return this.cityOrdersItems.filter(item =>
        item.city &&
        item.total_orders !== null &&
        item.population !== null &&
        (!this.cityOrdersQuery || item.city.toLowerCase().includes(this.cityOrdersQuery.toLowerCase()))
      );
    },
    totalItemsCityOrders() {
      return this.filteredCityOrdersItems.length;
    },
    totalPagesCityOrders() {
      return Math.ceil(this.totalItemsCityOrders / this.itemsPerPage);
    },
    paginatedCityOrdersItems() {
      const start = (this.currentPageCityOrders - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCityOrdersItems.slice(start, end);
    },
    sortedPaginatedCityOrdersItems() {
      return this.getSortedItems(this.paginatedCityOrdersItems, 'total_orders');
    }
  },
  methods: {
    getSortedItems(items, key) {
      return items.slice().sort((a, b) => b[key] - a[key]);
    }
  },
  async created() {
    try {
      const responseProductSales = await axios.get('/api/test2');
      const responseCityOrders = await axios.get('/api/test2');

      this.productSalesItems = responseProductSales.data;
      this.cityOrdersItems = responseCityOrders.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
</script>

<style scoped>
.content-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-container {
  margin-top: 20px;
}

b-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.custom-tab .nav-link {
  color: #fff !important; 
  font-weight: bold;
}

.custom-tab .nav-link.active {
  color: #000 !important; 
  background-color: #ffc107; 
}
</style>
